// const express = require('express');
// const {
//     getAllTags,
//     getTagById,
//     createTag,
//     updateTag,
//     deleteTag
// } = require('../controllers/TagController');
// const { isManager, isCustomer } = require('../middleware/auth');

// const router = express.Router();

// router.route('/')
//     .get(isCustomer, getAllTags) 
//     .post(isManager, createTag); 

// router.route('/:id')
//     .get(isCustomer, getTagById) 
//     .put(isManager, updateTag)  
//     .delete(isManager, deleteTag); 

// module.exports = router;