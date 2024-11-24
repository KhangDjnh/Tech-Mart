const express = require('express');
const {
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    searchShops
} = require('../controllers/ShopController');
const { isManager, isCustomer } = require('../middleware/auth');

const router = express.Router();

router.route('/search').get(isCustomer, searchShops);
router.route('/').get(isManager, getAllShops).post(isCustomer, createShop);
router.route('/:id').get(isCustomer, getShopById).put(isCustomer, updateShop).delete(isManager, deleteShop);

module.exports = router;
