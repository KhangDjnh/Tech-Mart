const Order = require("../models/order.js");

const Product = require('../models/product'); // Đảm bảo rằng bạn đã import model Product

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
      let totalPrice = 0;
      
      // Lặp qua từng sản phẩm và tính tổng giá trị
      for (const item of savedOrder.id_product) {
          const product = await Product.findById(item.product); // Tìm product bằng ID
          const productPrice = product ? product.price : 0; // Lấy giá của sản phẩm, nếu không có thì mặc định là 0
          const quantity = item.quantity;

          // Kiểm tra giá trị hợp lệ trước khi tính toán
          if (typeof productPrice === 'number' && !isNaN(productPrice) && typeof quantity === 'number' && !isNaN(quantity)) {
              totalPrice += productPrice * quantity;
          }
      }

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
      let totalPrice = 0;

      // Lặp qua từng sản phẩm và tính tổng giá trị
      for (const item of updatedOrder.id_product) {
          const product = await Product.findById(item.product); // Tìm product bằng ID
          const productPrice = product ? product.price : 0; // Lấy giá của sản phẩm, nếu không có thì mặc định là 0
          const quantity = item.quantity;

          // Kiểm tra giá trị hợp lệ trước khi tính toán
          if (typeof productPrice === 'number' && !isNaN(productPrice) && typeof quantity === 'number' && !isNaN(quantity)) {
              totalPrice += productPrice * quantity;
          }
      }

      updatedOrder.total_price = totalPrice;
      return await updatedOrder.save();
  }

  return updatedOrder;
};



exports.deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder;
};

exports.getOrdersByUserId = async (userId) => {
  try {
    // Tìm tất cả đơn hàng có id_user trùng với userId
    const orders = await Order.find({ id_user: userId });

    // Nếu không tìm thấy đơn hàng nào
    if (orders.length === 0) {
      throw new Error("No orders found for this user");
    }

    return orders; // Trả về danh sách các đơn hàng
  } catch (err) {
    throw new Error(err.message); 
  }
};
