const User = require("../models/user.js");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  const { 
    username, 
    email, 
    password,
    fullname, 
    phonenumber, 
    address, 
    gender, 
    birthday, 
    role, 
    profilePic, 
    coverPic 
  } = user;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    phonenumber,
    fullname,
    address,
    gender,
    birthday,
    role,
    profilePic,
    coverPic,
    // id_following: [], // Khởi tạo id_following rỗng
    // cart: [] // Khởi tạo cart rỗng
  });

  return await newUser.save();
};


exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, user) => {
  // If password is updated, hash it before updating the user
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  
  return await User.findByIdAndUpdate(id, user, { new: true }); // Return the updated user
};

// exports.updateCart = async (existingCart, newCart) => {
//   // Sao chép cart hiện tại để tránh thay đổi trực tiếp trên dữ liệu cũ
//   let updatedCart = [...existingCart];

//   // Duyệt qua từng item trong cart mới
//   for (let item of newCart) {
//     const { product, quantity } = item;

//     if (quantity > 0) {
//       // Kiểm tra xem sản phẩm đã có trong cart chưa
//       const existingItem = updatedCart.find(cartItem => cartItem.product.toString() === product.toString());

//       if (existingItem) {
//         // Nếu có, cập nhật quantity
//         existingItem.quantity = quantity;
//       } else {
//         // Nếu chưa có, thêm vào cart
//         updatedCart.push({ product, quantity });
//       }
//     } else {
//       // Nếu quantity = 0, xóa sản phẩm khỏi cart
//       updatedCart = updatedCart.filter(cartItem => cartItem.product.toString() !== product.toString());
//     }
//   }

//   return updatedCart;
// };

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

// exports.getCartByUserId = async (userId) => {
//   try {
//     // Lấy thông tin user và populate sản phẩm trong giỏ hàng
//     const user = await User.findById(userId).populate({
//       path: 'cart.product', // Truy cập sản phẩm trong cart
//       model: 'Product', // Model Product tham chiếu
//       select: 'name price description' // Chỉ lấy các trường cần thiết
//     });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     // Trả về giỏ hàng bao gồm cả quantity
//     const cartWithDetails = user.cart.map(item => ({
//       product: item.product,
//       quantity: item.quantity
//     }));

//     return cartWithDetails;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };
