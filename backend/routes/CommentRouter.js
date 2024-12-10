const express = require('express');
const {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByProductId
} = require('../controllers/CommentController');
const { isCustomer, isManager } = require('../middleware/auth');

const router = express.Router();

// Routes for comments
router.route('/')
    .get( getAllComments) 
    .post( createComment); 

router.route('/:id')
    .get( getCommentById) 
    .put( updateComment) 
    .delete(deleteComment); 

router.get("/product/:id_product", getCommentsByProductId);

module.exports = router;
