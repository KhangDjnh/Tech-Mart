const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    searchProductsByTagName,
    getProductWithComments,
    updateProductRating
} = require('../controllers/ProductController');
const { isManager, isCustomer, isEmployee } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary.js');

const router = express.Router();

// router.route('/tags/search')
//     .get(searchProductsByTagName); 

router.route('/search')
    .get(searchProducts);

router.route('/')
    .get(getAllProducts) 
    .post(isEmployee, upload.array('images', 10), createProduct); 

router.route('/:id')
    .get(getProductById) 
    .put(isEmployee, upload.array('images', 10), updateProduct)  
    .delete(isEmployee, deleteProduct); 

router.get("/comment/:id_product", getProductWithComments)
    .put("/:id_product/rating", updateProductRating); 
    
module.exports = router;
