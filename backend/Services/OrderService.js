const Order = require("../models/order.js");
const Product = require('../models/product');
const Cart = require("../models/cart.js");

exports.createOrder = async (order) => {
    const { id_user, id_product, status, address } = order;

    // Khởi tạo đơn hàng mới với total_price mặc định là 0
    const newOrder = new Order({
        id_user,
        id_product: id_product || [], // Nếu không có sản phẩm, khởi tạo mảng rỗng
        total_price: 0,
        status,
        address,
    });

    // Tính tổng giá trị đơn hàng nếu có sản phẩm
    if (newOrder.id_product.length > 0) {
        let totalPrice = 0;
        const insufficientStockProducts = [];

        for (const item of newOrder.id_product) {
            const product = await Product.findById(item.product); // Tìm product bằng ID
            
            if (!product) {
                throw new Error(`Product with ID ${item.product} not found.`);
            }

            const { price, stock } = product; // Lấy giá và stock của sản phẩm
            const quantity = item.quantity;

            if (stock < quantity) {
                insufficientStockProducts.push(product.name);
            } else {
                // Tính tổng giá trị khi stock hợp lệ
                totalPrice += price * quantity;
            }
        }

        // Nếu có sản phẩm hết hàng, trả về thông báo lỗi
        if (insufficientStockProducts.length > 0) {
            throw new Error(`Insufficient stock for products: ${insufficientStockProducts.join(", ")}`);
        }

        // Nếu đủ stock, tiến hành trừ stock và cập nhật
        for (const item of newOrder.id_product) {
            const product = await Product.findById(item.product);
            product.stock -= item.quantity; // Trừ stock
            await product.save(); // Lưu lại thay đổi
        }

        // Cập nhật total_price
        newOrder.total_price = totalPrice;

        // Cập nhật giỏ hàng dựa trên userId
        const cart = await Cart.findOne({ id_user });
        if (!cart) {
            throw new Error("Cart not found for the user.");
        }

        cart.cart = cart.cart.filter(cartItem => {
            const orderedItem = id_product.find(orderItem => orderItem.product.toString() === cartItem.product_id.toString());
            return !orderedItem; // Loại bỏ sản phẩm đã đặt hàng khỏi cart
        });

        await cart.save(); // Lưu thay đổi giỏ hàng
    }

    return await newOrder.save(); // Lưu và trả về đơn hàng
};

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};

exports.updateOrder = async (id, orderData) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });

  if (!updatedOrder) {
      throw new Error("Order not found");
  }

  // Nếu có thay đổi sản phẩm, tính lại tổng giá trị
  if (updatedOrder.id_product.length > 0) {
      let totalPrice = 0;

      // Lặp qua từng sản phẩm và tính tổng giá trị
      for (const item of updatedOrder.id_product) {
          const product = await Product.findById(item.product); // Tìm product bằng ID
          const productPrice = product ? product.price : 0; // Lấy giá của sản phẩm, nếu không có thì mặc định là 0
          const quantity = item.quantity;

          // Kiểm tra giá trị hợp lệ trước khi tính toán
          if (typeof productPrice === 'number' && !isNaN(productPrice) && typeof quantity === 'number' && !isNaN(quantity)) {
              totalPrice += productPrice * quantity;
          }
      }

      updatedOrder.total_price = totalPrice;
      return await updatedOrder.save();
  }

  return updatedOrder;
};

exports.deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};

exports.getOrdersByUserId = async (userId) => {
  try {
    // Tìm tất cả đơn hàng có id_user trùng với userId
    const orders = await Order.find({ id_user: userId });

    // Nếu không tìm thấy đơn hàng nào
    if (orders.length === 0) {
      throw new Error("No orders found for this user");
    }

    return orders; // Trả về danh sách các đơn hàng
  } catch (err) {
    throw new Error(err.message); 
  }
};
