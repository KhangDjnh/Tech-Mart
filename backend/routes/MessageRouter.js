const express = require('express');
const router = express.Router();
const { 
    createMessage, 
    getMessageById, 
    getAllMessages, 
    updateMessage, 
    deleteMessage 
} = require('../controllers/MessageController');
const { upload } = require('../utils/cloudinary.js');
const { isManager, isCustomer } = require("../middleware/auth.js");

router.route("/").get(getAllMessages).post(upload.array('images', 10), createMessage);
router.route("/:id").get(getMessageById).put(upload.array('images', 10), updateMessage);
router.route("/:id").delete(deleteMessage);

module.exports = router;
