const Cart = require("../models/cart.js");

exports.createCart = async (cart) => {
  const { id_user } = cart;

  const newCart = new Cart({
    id_user,
    id_product: []  // Khởi tạo giỏ hàng rỗng
  });

  return await newCart.save();
};

exports.getAllCarts = async () => {
  return await Cart.find();
};

exports.getCartById = async (id) => {
  const cart = await Cart.findById(id);
  return cart;
};

exports.updateCart = async (id, cart) => {
  const updatedCart = await Cart.findByIdAndUpdate(id, cart, { new: true });
  return updatedCart;
};

exports.deleteCart = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  return deletedCart;
};
