const express = require('express');
const router = express.Router();
const { 
    createMessage, 
    getMessageById, 
    getAllMessages, 
    updateMessage, 
    deleteMessage,
    getMessagesByConversation
} = require('../controllers/MessageController');
const { upload } = require('../utils/cloudinary.js');
const { isManager, isCustomer } = require("../middleware/auth.js");

router.route("/").get(getAllMessages).post(upload.array('messImages', 10), createMessage);
router.route("/:id").get(getMessageById).put(upload.array('messImages', 10), updateMessage);
router.route("/:id").delete(deleteMessage);
router.route("/:id_conversation/messages").get(getMessagesByConversation);
module.exports = router;
