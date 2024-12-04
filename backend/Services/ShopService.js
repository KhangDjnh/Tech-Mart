// const Shop = require('../models/shop');

// exports.createShop = async (shopData) => {
//     const { id_user, name, description, address, avatar, cover } = shopData;

//     // Tạo mới shop với thông tin và avatar, cover mặc định nếu có
//     const newShop = new Shop({
//         id_user,
//         name,
//         description,
//         address,
//         avatar: avatar || "TechMart-User/default_user", // Avatar mặc định nếu không có
//         cover: cover || "TechMart-User/default_cover",  // Cover mặc định nếu không có
//         id_follower: [],
//     });

//     return await newShop.save();
// };

// exports.getShopById = async (id) => {
//     return await Shop.findById(id);  
// };

// exports.getAllShops = async () => {
//     return await Shop.find();
// };

// exports.updateShop = async (id, shopData) => {
//     return await Shop.findByIdAndUpdate(id, shopData, { new: true });
// };

// exports.deleteShop = async (id) => {
//     return await Shop.findByIdAndDelete(id);
// };

// exports.searchShopsByKeyword = async (keyword) => {
//     return await Shop.find({
//         name: { $regex: keyword, $options: 'i' } // 'i' để không phân biệt hoa thường
//     });
// };
