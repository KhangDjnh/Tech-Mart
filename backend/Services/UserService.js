const User = require("../models/user.js");
const bcrypt = require("bcrypt");

exports.createUser = async (user) => {
  const { username, email, password, phonenumber, address, gender, birthday, role, profilePic, coverPic } = user;

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
    id_following: [], // Assuming an empty array for id_following by default
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

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
