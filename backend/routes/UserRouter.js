const express = require("express");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getCart
} = require("../controllers/UserController.js");
const { isManager, isCustomer } = require("../middleware/auth.js");

const { upload } = require('../utils/cloudinary.js');

const router = express.Router();
router
  .route("/getcart/:id").get(isCustomer, getCart);

router
  .route("/")
  .get(isManager, getAllUsers)
  .post(isManager, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), createUser);
router
  .route("/:id")
  .get(getUserById)
  .put(upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), updateUser)
  .delete(isManager, deleteUser);

module.exports = router;
