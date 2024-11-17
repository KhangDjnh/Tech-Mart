const express = require('express');
const router = express.Router();
const {
    createConversation,
    getConversationById,
    getAllConversations,
    deleteConversation,
} = require('../controllers/ConversationController');
const { isManager, isCustomer } = require("../middleware/auth.js");

router.route("/").get(getAllConversations).post(createConversation);
router.route("/conversations/:id").get(getConversationById)
router.route("/conversations/:id").delete(deleteConversation)

module.exports = router;
