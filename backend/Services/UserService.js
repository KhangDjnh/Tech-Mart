const User = require("../models/user.js");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  const { 
    username, 
    email, 
    password, 
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
    address,
    gender,
    birthday,
    role,
    profilePic,
    coverPic,
    id_following: [], // Khởi tạo id_following rỗng
    cart: [] // Khởi tạo cart rỗng
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

  if (user.cart && !Array.isArray(user.cart)) {
    throw new Error('Cart must be an array of objects with product and quantity fields.');
  }

  return await User.findByIdAndUpdate(id, user, { new: true }); // Return the updated user
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.getCartByUserId = async (userId) => {
  try {
    // Lấy thông tin user và populate sản phẩm trong giỏ hàng
    const user = await User.findById(userId).populate({
      path: 'cart.product', // Truy cập sản phẩm trong cart
      model: 'Product', // Model Product tham chiếu
      select: 'name price description' // Chỉ lấy các trường cần thiết
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Trả về giỏ hàng bao gồm cả quantity
    const cartWithDetails = user.cart.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));

    return cartWithDetails;
  } catch (err) {
    throw new Error(err.message);
  }
};
