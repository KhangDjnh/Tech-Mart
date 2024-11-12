const Shop = require('../models/shop'); 

exports.createShop = async (shopData) => {
    const { id_user, name, description, address } = shopData;
    
    const newShop = new Shop({
        id_user,
        name,
        description,
        address,
        id_follower: [], 
    });

    return await newShop.save();
};

exports.getShopById = async (id) => {
    return await Shop.findById(id);  
};

exports.getAllShops = async () => {
    return await Shop.find();
};

exports.updateShop = async (id, shopData) => {
    return await Shop.findByIdAndUpdate(id, shopData, { new: true });
};

exports.deleteShop = async (id) => {
    return await Shop.findByIdAndDelete(id);
};
