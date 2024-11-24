const shopService = require("../Services/ShopService");

exports.createShop = async (req, res) => {
    try {
        const { id_user, name } = req.body;
        const newShop = await shopService.createShop({ id_user, name });
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
        const { name, description, address, id_follower } = req.body;  
        const shop = await shopService.getShopById(req.params.id);
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        if (id_follower) {
            if (!shop.id_follower.includes(id_follower)) {
                shop.id_follower.push(id_follower);  
            } else {
                shop.id_follower = shop.id_follower.filter(userId => userId.toString() !== id_follower);  
            }
        }

        const updatedShop = await shopService.updateShop(req.params.id, { name, description, address, id_follower: shop.id_follower });
        res.status(200).json({ data: updatedShop, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteShop = async (req, res) => {
    try {
        const shop = await shopService.getShopById(req.params.id);
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
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
