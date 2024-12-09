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
  let cart = await Cart.findOne({ id_user: id }); // Tìm cart theo id_user
  if (!cart) {
    // Nếu không tìm thấy, tạo một giỏ hàng mới
    cart = new Cart({
      id_user: id,
      id_product: [] // Giỏ hàng rỗng
    });
    await cart.save(); // Lưu giỏ hàng mới vào cơ sở dữ liệu
  }
  return cart; // Trả về giỏ hàng (cũ hoặc mới tạo)
};

exports.deleteCart = async (id) => {
  const deletedCart = await Cart.findByIdAndDelete(id);
  return deletedCart;
};
exports.getCartByUserId = async (userId) => {
  return await Cart.findOne({ id_user: userId }).populate("cart.product_id");
};
exports.updateCart = async (userId, cartData) => {
  // Tìm kiếm giỏ hàng theo userId
  let cart = await Cart.findOne({ id_user: userId });

  // Nếu không tìm thấy giỏ hàng, tạo mới và gán dữ liệu
  if (!cart) {
      cart = new Cart({
          id_user: userId,
          cart: cartData.map(item => ({
              product_id: item.product_id,
              quantity: item.quantity
          }))
      });
      return await cart.save(); // Lưu và trả về giỏ hàng mới
  }

  // Nếu đã có giỏ hàng, cập nhật dữ liệu
  for (const item of cartData) {
      const existingProductIndex = cart.cart.findIndex(cartItem => 
          cartItem.product_id.toString() === item.product_id.toString()
      );

      if (existingProductIndex > -1) {
          // Sản phẩm đã tồn tại trong giỏ hàng
          if (item.quantity === 0) {
              // Nếu số lượng là 0, xóa sản phẩm khỏi giỏ hàng
              cart.cart.splice(existingProductIndex, 1);
          } else {
              // Cập nhật số lượng sản phẩm
              cart.cart[existingProductIndex].quantity = item.quantity;
          }
      } else {
          // Sản phẩm chưa có trong giỏ hàng, thêm vào
          if (item.quantity > 0) {
              cart.cart.push({
                  product_id: item.product_id,
                  quantity: item.quantity
              });
          }
      }
  }

  // Lưu các thay đổi và trả về giỏ hàng đã cập nhật
  return await cart.save();
};
