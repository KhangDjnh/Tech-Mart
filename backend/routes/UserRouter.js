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
<<<<<<< HEAD
  .post(isManager, upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), createUser);
router
  .route("/:id")
  .get(getUserById)
  .put(upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), updateUser)
=======
  .post(isManager, upload.single('image'), createUser);
router
  .route("/:id")
  .get(isCustomer, getUserById)
  .put(isCustomer, updateUser)
>>>>>>> parent of 25a4919 (Merge branch 'master' into fix/multer_user_route)
  .delete(isManager, deleteUser);

module.exports = router;
