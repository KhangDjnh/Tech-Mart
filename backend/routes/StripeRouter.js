const express = require("express");
const Stripe = require("stripe");
const CartService = require("../Services/CartService");
const orderService = require("../Services/OrderService");
const productService = require("../Services/ProductService");
const Order = require("../models/order");
const mongoose = require("mongoose");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();
let lineItemsData;

router.post("/create-checkout-session", async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId,
      },
    });

    const line_items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await productService.getProductById(item.id);
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: product.name,
              images: product.image ? [product.image.url] : [],
              description: product.desc,
              metadata: { id: product._id.toString() },
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      })
    );

    lineItemsData = line_items.map((item) => ({
      id: item.price_data.product_data.metadata.id,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "VN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "vnd" },
            display_name: "Free shipping",
            delivery_estimate: { minimum: { unit: "business_day", value: 5 }, maximum: { unit: "business_day", value: 7 } },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 100000, currency: "vnd" },
            display_name: "Express",
            delivery_estimate: { minimum: { unit: "business_day", value: 1 }, maximum: { unit: "business_day", value: 1 } },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      customer: customer.id,
      line_items,
      mode: "payment",
      metadata: {
        userId,
        cartItems: JSON.stringify(cartItems.map((item) => ({ id: item.id }))),
      },
      success_url: `${process.env.CLIENT_URL}checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res.status(500).send("Error creating Stripe session");
  }
});

// Create Order Function
const createOrder = async (customer, data, lineItemsData) => {
  const newOrder = new Order({
    userId: new mongoose.Types.ObjectId(customer.metadata.userId),
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItemsData,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });
  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.error("Error saving order:", err.message);
  }
};

// Webhook Endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified:", event.type);
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const data = event.data.object;
    const eventType = event.type;

    if (eventType === "checkout.session.completed") {
      try {
        // Retrieve customer and create order
        const customer = await stripe.customers.retrieve(data.customer);
        const cartItems = JSON.parse(data.metadata.cartItems);
        const cartProductIds = cartItems.map((item) => item.id);

        const userCart = await CartService.getCartByUserId(data.metadata.userId);
        //console.log('userCart: ', userCart);
        if (userCart) {
          userCart.cart = userCart.cart.filter((item) => {
            //console.log("CartProductIds: ", cartProductIds);
            //console.log("Item Product ID: ", String(item.product_id._id));
            return !cartProductIds.includes(String(item.product_id._id));
          });
          await userCart.save();
          //console.log("Cart updated for user:", userCart);
        }
        createOrder(customer, data, lineItemsData);
      } catch (err) {
        console.error("Error processing checkout.session.completed:", err.message);
      }
    }

    res.status(200).end(); // Respond to Stripe to acknowledge receipt
  }
);

module.exports = router;
