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
const { isManager, isCustomer, isEmployee } = require('../middleware/auth');

const router = express.Router();

router.route('/tags/search')
    .get(isCustomer, searchProductsByTagName); 

router.route('/search')
    .get(isCustomer, searchProducts);

router.route('/')
    .get(isCustomer, getAllProducts) 
    .post(isEmployee, createProduct); 

router.route('/:id')
    .get(isCustomer, getProductById) 
    .put(isEmployee, updateProduct)  
    .delete(isEmployee, deleteProduct); 

module.exports = router;
