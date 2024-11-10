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
  return await Cart.find().populate('id_user').populate('id_product.product');
};

exports.getCartById = async (id) => {
  const cart = await Cart.findById(id).populate('id_user').populate('id_product.product');
  return cart || null; // Trả về null nếu không tìm thấy
};

exports.updateCart = async (id, cartData) => {
  const updatedCart = await Cart.findByIdAndUpdate(id, cartData, { new: true })
    .populate('id_user')
    .populate('id_product.product');
  return updatedCart || null; // Trả về null nếu không tìm thấy
};

exports.deleteCart = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  return deletedCart || null; // Trả về null nếu không tìm thấy
};
