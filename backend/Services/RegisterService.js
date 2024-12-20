const User = require("../models/user");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail, verifyConnection } = require("../utils/mailserver");
const { updateCustomers } = require("../socketHandlers/updates/customers");

function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

exports.registerUser = async (user) => {
  const { username, email, password, phonenumber, profilePic, coverPic } = user;
  const confirmationToken = generateToken();
  const confirmationExpires = Date.now() + 120000;

  const salt = await bcrypt.genSalt(10);
  hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
    phonenumber,
    profilePic,
    coverPic,
    confirmationToken,
    confirmationExpires,
  });
  
  // try {
  //   const employee = await User.findById("6631eca7cdb504839a6da6d1");

  //   if (employee) {
  //     employee.customers = [...employee.customers, newUser._id];
  //     await employee.save();
  //     updateCustomers(employee._id.toString());
  //   }

  //   newUser.customers = [employee?._id];
  //   await newUser.save();

  //   return newUser;
  // } catch (error) {
  //   throw error;
  // }

//  // const employee = await User.findById("6631eca7cdb504839a6da6d1"); 

  // employee.customers = [...employee.customers, newUser._id];
  // await employee.save();

  // updateCustomers(employee._id.toString());

// // newUser.customers = [employee._id];

  try {
    await newUser.save();

    await verifyConnection();
    sendConfirmationEmail(email, confirmationToken);

    const checkConfirmation = async (resolve, reject, startTime) => {
      if (Date.now() - startTime > 120000) {
        await User.findOneAndDelete({ email });
        return reject(new Error("Email confirmation timeout"));
      }

      const user = await User.findOne({ email });

      if (user && user.emailConfirmed) {
        return resolve(user);
      } else {
        setTimeout(() => checkConfirmation(resolve, reject, startTime), 5000);
      }
    };

    await new Promise((resolve, reject) => {
      checkConfirmation(resolve, reject, Date.now());
    });

    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }

};
exports.registerFindUser = async (email) => {
  return await User.findOne({ email: email });
};
