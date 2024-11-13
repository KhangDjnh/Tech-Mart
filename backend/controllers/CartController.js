const cartService = require("../Services/CartService");

exports.createCart = async (req, res) => {
  try {
    const { id_user } = req.body;
    const newCart = await cartService.createCart({ id_user });
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
    const { id_product } = req.body;  // Chỉ cập nhật mảng id_product
    const cart = await cartService.getCartById(req.params.id);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const updatedCart = await cartService.updateCart(req.params.id, { id_product });
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
