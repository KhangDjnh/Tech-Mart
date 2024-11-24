const Order = require("../models/order.js");

exports.createOrder = async (order) => {
  const { id_user, id_product, status, address } = order;

  // Khởi tạo đơn hàng mới với total_price mặc định là 0
  const newOrder = new Order({
      id_user,
      id_product: id_product || [], // Nếu không có sản phẩm, khởi tạo mảng rỗng
      total_price: 0,
      status,
      address,
  });

  // Lưu đơn hàng tạm thời
  const savedOrder = await newOrder.save();

  // Tính tổng giá trị đơn hàng nếu có sản phẩm
  if (savedOrder.id_product.length > 0) {
      const totalPrice = await calculateTotalPrice(savedOrder._id);
      savedOrder.total_price = totalPrice;
      return await savedOrder.save();
  }

  return savedOrder; // Trả về đơn hàng nếu không có sản phẩm
};

exports.getAllOrders = async () => {
  return await Order.find();
};

exports.getOrderById = async (id) => {
  const order = await Order.findById(id);
  return order;
};

exports.updateOrder = async (id, orderData) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, orderData, { new: true });

  if (!updatedOrder) {
      throw new Error("Order not found");
  }

  // Nếu có thay đổi sản phẩm, tính lại tổng giá trị
  if (updatedOrder.id_product.length > 0) {
      const totalPrice = await calculateTotalPrice(id);
      updatedOrder.total_price = totalPrice;
      return await updatedOrder.save();
  }

  return updatedOrder;
};

exports.deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};

exports.calculateTotalPrice = async (orderId) => {
    // Lấy thông tin đơn hàng theo ID
    const order = await Order.findById(orderId).populate("id_product.product");

    if (!order) {
        throw new Error("Order not found");
    }

    // Tính tổng giá trị đơn hàng
    const totalPrice = order.id_product.reduce((total, item) => {
        const productPrice = item.product.price; 
        const quantity = item.quantity; 
        return total + productPrice * quantity;
    }, 0);

    return totalPrice;
};
