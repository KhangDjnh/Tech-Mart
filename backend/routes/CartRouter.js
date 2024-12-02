const express = require('express');
const {
    getAllCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
} = require('../controllers/CartController');
const { isManager, isCustomer } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(isManager, getAllCarts) 
    .post(isCustomer, createCart); 

router.route('/:id')
    .get(isCustomer, getCartById) 
    .put(isCustomer, updateCart)  
    .delete(isCustomer, deleteCart); 

module.exports = router;