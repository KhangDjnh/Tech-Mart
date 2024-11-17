const express = require('express');
const router = express.Router();
const { 
    createMessage, 
    getMessageById, 
    getAllMessages, 
    updateMessage, 
    deleteMessage 
} = require('../controllers/MessageController');

const { isManager, isCustomer } = require("../middleware/auth.js");

router.route("/").get(getAllMessages).post(createMessage);
router.route("/:id").get(getMessageById).put(updateMessage);
router.route("/:id").delete(deleteMessage);

module.exports = router;
