const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.verifyConnection = async () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error("Failed to connect to email server:", error);
        reject(new Error("Failed to connect to email server"));
      } else {
        console.log("Email server is ready to take messages");
        resolve(true);
      }
    });
  });
};

exports.sendConfirmationEmail = (email, token) => {
  const PORT = process.env.PORT || 5000;
  const url = `http://localhost:${PORT}`;

  const mailOptions = {
    from: `"TechMart Support" <support@techmart.com>`,
    to: email,
    subject: "Confirm your TechMart account",
    html: `<p>Hello,</p>
           <p>Please click on the link below to confirm your TechMart account:</p>
           <a href="${url}/api/confirm?token=${token}">Confirm Account</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Confirmation email sent: %s", info.messageId);
  });
};

exports.sendForgotPasswordEmail = (email, newPass) => {
  const mailOptions = {
    from: `"TechMart Support" <support@techmart.com>`,
    to: email,
    subject: "New Password",
    html: `<p>Hello,</p>
           <p>Your new password is ${newPass}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Email has been sent: %s", info.messageId);
  });
};
