const orderService = require("../Services/OrderService");

exports.createOrder = async (req, res) => {
  try {
    const { id_user, id_product, status, address } = req.body;

    const newOrder = await orderService.createOrder({
      id_user,
      id_product, // Danh sách sản phẩm và số lượng
      status,
      address,
    });

    res.status(201).json({ data: newOrder, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ data: order, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ data: orders, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id_product, status, address } = req.body; 
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedOrder = await orderService.updateOrder(req.params.id, {
      id_product,
      status,
      address,
    });

    res.status(200).json({ data: updatedOrder, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deletedOrder = await orderService.deleteOrder(req.params.id);
    res.status(200).json({ data: deletedOrder, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const orders = await orderService.getOrdersByUserId(userId);

    res.status(200).json({
      data: orders,
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
