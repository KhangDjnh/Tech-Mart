// import { forgotPassword } from "../../Backend/controllers/ForgotPassController.js";
import { api, setHeaders } from "./api.js";

export const productApi = {
  getProduct() {
    const url = "/product";
    return api.get(url, setHeaders());
  },
  getProductById(id) {
    const url = `/product/${id}`;
    return api.get(url, setHeaders());
  },
  createProduct(data) {
    const url = "/product";
    return api.post(url, data, setHeaders());
  },
  deleteProduct(productId) {
    const url = `/product/${productId}`;
    return api.delete(url, setHeaders());
  },
  updateProduct(data, productId) {
    const url = `/product/${productId}`;
    return api.put(url, data, setHeaders());
  },
  getUserCart(userId) {
    const url = `/user/getcart/${userId}/`;
    return api.get(url, setHeaders());
  },
  updateUserCart(userId, productId) {
    const url = `/user/${userId}/cart/${productId}`;
    return api.post(url, setHeaders());
  },
  deleteUserCart(userId, cartItems) {
    console.log(">>>>", cartItems);
    const url = `/user/${userId}/cart`;
    const res = api.post(url, cartItems, setHeaders());
    console.log(res);
    return res;
  },
};

export const checkoutApi = {
  async checkout(data) {
    try {
      const url = "/stripe/create-checkout-session";
      const stripeUrl = await api.post(url, data, setHeaders());
      window.location.href = stripeUrl.data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  },
};

export const commentApi = {
  getAllComments(productId) {
    const url = `/product/${productId}/comment`;
    return api.get(url, setHeaders());
  },

  createComment(productId, comment) {
    const url = `/product/${productId}/comment`;
    return api.post(url, comment, setHeaders());
  },

  reply(productId, commentId, comment) {
    const url = `/product/${productId}/comment/${commentId}`;
    return api.post(url, comment, setHeaders());
  },
};
