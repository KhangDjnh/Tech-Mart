const Order = require("../models/order.js");

exports.createOrder = async (order) => {
  const { id_user, total_price, status, address } = order;

  const newOrder = new Order({
    id_user,
    id_product: [], // Khởi tạo mảng rỗng cho id_product
    total_price,
    status,
    address,
  });

  return await newOrder.save();
};

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};

exports.updateOrder = async (id, order) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true });
  return updatedOrder;
};

exports.deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};
