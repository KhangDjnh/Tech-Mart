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
const { upload } = require('../utils/cloudinary.js');

const router = express.Router();

router.route('/search').get(isCustomer, searchShops);
router.route('/')
    .get(isManager, getAllShops)
    .post(isCustomer, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), createShop);

router.route('/:id')
    .get(isCustomer, getShopById)
    .put(isManager, upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), updateShop)
    .delete(isManager, deleteShop);

module.exports = router;
