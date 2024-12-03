const express = require('express');
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUser
} = require('../controllers/OrderController');
const { isManager, isCustomer } = require('../middleware/auth');

const router = express.Router();

router.route('/user/:id').get(getOrdersByUser);

router.route('/')
    .get(isManager, getAllOrders) 
    .post(createOrder); 

router.route('/:id')
    .get(getOrderById) 
    .put(updateOrder)  
    .delete(deleteOrder); 

module.exports = router;