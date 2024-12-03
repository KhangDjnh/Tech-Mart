const express = require("express");
const { registerUser } = require("../controllers/RegisterController");
const { upload } = require('../utils/cloudinary.js');

const router = express.Router();

router.route("/").post(upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), registerUser);

module.exports = router;