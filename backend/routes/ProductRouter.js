const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    searchProductsByTagName
} = require('../controllers/ProductController');
const { isManager, isCustomer } = require('../middleware/auth');
const upload = require('../utils/cloudinary');

const router = express.Router();

router.route('/tags/search')
    .get(isCustomer, searchProductsByTagName); 

router.route('/search')
    .get(isCustomer, searchProducts);

router.route('/')
    .get(isCustomer, getAllProducts) 
    .post(isManager, createProduct); 
router.route('/:id')
    .get(isCustomer, getProductById) 
    .put(isManager, updateProduct)  
    .delete(isManager, deleteProduct); 

module.exports = router;
