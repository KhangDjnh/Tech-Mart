import { api, setHeaders } from "./api.js";

export const orderApi = {
  createOrder() {
    const url = "/order";
    return api.post(url, setHeaders());
  },
  getAllOrder() {
    const url = "/order";
    return api.get(url, setHeaders());
  },
  getOrderById(orderId) {
    const url = `/order/${orderId}`;
    return api.get(url, setHeaders());
  },
  updateOrderById(orderId,data) {
    const url = `/order/${orderId}`;
    return api.put(url, data,setHeaders());
  },
  deleteOrder(orderId) {
    const url = `/order/${orderId}`;
    return api.delete(url, setHeaders());
  },
  // getOrderStats() {
  //   //   const url = `/stats`;
  //   //   return api.get(url, setHeaders());
  //   // },
  //   // getIncomeStats() {
  //   //   const url = `/income/stats`;
  //   //   return api.get(url, setHeaders());
  //   // },
  //   // getOneWeekSales() {
  //   //   const url = `/week-sales`;
  //   //   return api.get(url, setHeaders());
  //   // },
  getOrderByUserId(userId) {
    const url = `order/user/${userId}`;
    return api.get(url, setHeaders());
  }
};
