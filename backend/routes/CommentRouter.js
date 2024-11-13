const express = require('express');
const {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/CommentController');
const { isCustomer, isManager } = require('../middleware/auth');

const router = express.Router();

// Routes for comments
router.route('/')
    .get(isCustomer, getAllComments) 
    .post(isCustomer, createComment); 

router.route('/:id')
    .get(isCustomer, getCommentById) 
    .put(isCustomer, updateComment) 
    .delete(isCustomer, deleteComment); 

module.exports = router;
