const express = require('express');
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/OrderController');
const { isManager, isCustomer } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(isManager, getAllOrders) 
    .post(isCustomer, createOrder); 

router.route('/:id')
    .get(isCustomer, getOrderById) 
    .put(isCustomer, updateOrder)  
    .delete(isCustomer, deleteOrder); 

module.exports = router;