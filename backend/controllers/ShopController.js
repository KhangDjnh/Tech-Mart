const shopService = require("../Services/ShopService");
const imageService = require("../services/ImageService");
const userService = require("../Services/UserService");

exports.createShop = async (req, res) => {
  try {
    const { id_user, name, avatar, cover } = req.body;
    let shopAvatar = avatar;
    let shopCover = cover;

    // Nếu không cung cấp avatar hoặc cover, lấy từ user
    const user = await userService.getUserById(id_user);
    if (!shopAvatar) {
      shopAvatar = user && user.profilePic ? user.profilePic : "TechMarket-User/default_user";
    }
    if (!shopCover) {
      shopCover = user && user.coverPic ? user.coverPic : "TechMarket-User/default_cover";
    }

    const newShop = await shopService.createShop({ id_user, name, avatar: shopAvatar, cover: shopCover });
    res.status(201).json({ data: newShop, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await shopService.getShopById(req.params.id);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
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
    const { name, description, address, id_follower, avatar, cover } = req.body;
    const shop = await shopService.getShopById(req.params.id);

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Nếu có cập nhật avatar
    if (avatar) {
      // Xóa avatar cũ nếu có
      if (shop.avatar && shop.avatar.public_id) {
        await imageService.deleteImage(shop.avatar.public_id);
      }
      // Lưu avatar mới
      shop.avatar = avatar;
    } else if (!shop.avatar) {
      // Nếu không có avatar, dùng ảnh mặc định của user
      const user = await userService.getUserById(shop.id_user);
      shop.avatar = user && user.profilePic ? user.profilePic : "TechMarket-User/default_user";
    }

    // Nếu có cập nhật cover
    if (cover) {
      if (shop.cover && shop.cover.public_id) {
        await imageService.deleteImage(shop.cover.public_id);
      }
      shop.cover = cover;
    } else if (!shop.cover) {
      const user = await userService.getUserById(shop.id_user);
      shop.cover = user && user.coverPic ? user.coverPic : "TechMarket-User/default_cover";
    }

    // Cập nhật id_follower
    if (id_follower) {
      if (!shop.id_follower.includes(id_follower)) {
        shop.id_follower.push(id_follower);
      } else {
        shop.id_follower = shop.id_follower.filter(userId => userId.toString() !== id_follower);
      }
    }

    const updatedShop = await shopService.updateShop(req.params.id, {
      name,
      description,
      address,
      avatar: shop.avatar,
      cover: shop.cover,
      id_follower: shop.id_follower
    });
    res.status(200).json({ data: updatedShop, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await shopService.getShopById(req.params.id);

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Xóa avatar trên Cloudinary nếu có
    if (shop.avatar && shop.avatar.public_id) {
      const deleteResponse = await imageService.deleteImage(shop.avatar.public_id);
      if (!deleteResponse.result === "ok") {
        throw new Error("Failed to delete avatar from Cloudinary");
      }
    }

    // Xóa cover trên Cloudinary nếu có
    if (shop.cover && shop.cover.public_id) {
      const deleteResponse = await imageService.deleteImage(shop.cover.public_id);
      if (!deleteResponse.result === "ok") {
        throw new Error("Failed to delete cover from Cloudinary");
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
    const keyword = req.query.keyword || ""; // Lấy từ khóa từ query string
    const shops = await shopService.searchShopsByKeyword(keyword);

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found", status: "fail" });
    }

    res.status(200).json({ data: shops, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
