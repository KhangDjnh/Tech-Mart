const shopService = require("../Services/ShopService");
const imageService = require("../services/ImageService");
const userService = require("../services/ImageService");

exports.createShop = async (req, res) => {
    try {
        const { id_user, name, avatar } = req.body;
        let shopAvatar = avatar;

        // Nếu không cung cấp avatar, lấy avatar của user
        if (!shopAvatar) {
            const user = await userService.getUserById(id_user);
            if (user && user.avatar) {
                shopAvatar = user.avatar; // Lấy avatar của chủ shop
            }
        }

        const newShop = await shopService.createShop({ id_user, name, avatar: shopAvatar });
        res.status(201).json({ data: newShop, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getShopById = async (req, res) => {
    try {
        const shop = await shopService.getShopById(req.params.id);
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }
        res.status(200).json({ data: shop, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllShops = async (req, res) => {
    try {
        const shops = await shopService.getAllShops();
        res.status(200).json({ data: shops, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateShop = async (req, res) => {
    try {
        const { name, description, address, id_follower, avatar } = req.body;  
        const shop = await shopService.getShopById(req.params.id);
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop không tồn tại' });
        }

        // Nếu có cập nhật avatar
        if (avatar) {
            // Xóa avatar cũ nếu có
            if (shop.avatar && shop.avatar.public_id) {
                await imageService.deleteImage(shop.avatar.public_id);
            }
            // Lưu avatar mới
            shop.avatar = avatar;
        }

        if (id_follower) {
            if (!shop.id_follower.includes(id_follower)) {
                shop.id_follower.push(id_follower);  
            } else {
                shop.id_follower = shop.id_follower.filter(userId => userId.toString() !== id_follower);  
            }
        }

        const updatedShop = await shopService.updateShop(req.params.id, { name, description, address, avatar: shop.avatar, id_follower: shop.id_follower });
        res.status(200).json({ data: updatedShop, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteShop = async (req, res) => {
    try {
        const shop = await shopService.getShopById(req.params.id);
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop không tồn tại' });
        }

        // Xóa avatar trên Cloudinary nếu có
        if (shop.avatar && shop.avatar.public_id) {
            const deleteResponse = await imageService.deleteImage(shop.avatar.public_id);
            if (!deleteResponse.result === "ok") {
                throw new Error("Không thể xóa ảnh từ Cloudinary");
            }
        }

        const deletedShop = await shopService.deleteShop(req.params.id);
        res.status(200).json({ data: deletedShop, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchShops = async (req, res) => {
    try {
        const keyword = req.query.keyword || ''; // Lấy từ khóa từ query string
        const shops = await shopService.searchShopsByKeyword(keyword);

        if (shops.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy cửa hàng", status: "fail" });
        }

        res.status(200).json({ data: shops, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
