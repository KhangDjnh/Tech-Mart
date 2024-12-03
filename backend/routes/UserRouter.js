const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/UserController.js");
const { isManager, isCustomer } = require("../middleware/auth.js");

const { upload } = require('../utils/cloudinary.js');

const router = express.Router();
router
  .route("/")
  .get(isManager, getAllUsers)
  //new
  .post(isManager, upload.single('image'), createUser);
  // old
  //.post(isManager, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), createUser);
router
  .route("/:id")
  .get(isCustomer, getUserById)
  .put(isCustomer, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), updateUser)
  .delete(isManager, deleteUser);

module.exports = router;
