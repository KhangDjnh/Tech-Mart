const cartService = require("../Services/CartService");
const userService = require("../Services/UserService");

exports.createCart = async (req, res) => {
  try {
    const { id_user } = req.body;
    const newCart = await cartService.createCart({ id_user, id_product: [] });
    res.status(201).json({ data: newCart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json({ data: cart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.status(200).json({ data: carts, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
      const userId = req.params.id; // Lấy user_id từ params

      // Kiểm tra userId hợp lệ bằng userService
      const user = await userService.getUserById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const cartData = req.body; // Lấy cartData từ body

      if (!cartData || !Array.isArray(cartData)) {
          return res.status(400).json({ error: "Cart data must be a valid array." });
      }

      // Cập nhật cart dựa trên userId và cartData
      const updatedCart = await cartService.updateCart(userId, cartData);

      // Trả về phản hồi với giỏ hàng đã cập nhật
      res.status(200).json({ data: updatedCart, status: "success" });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


exports.deleteCart = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const deletedCart = await cartService.deleteCart(req.params.id);
    res.status(200).json({ data: deletedCart, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


