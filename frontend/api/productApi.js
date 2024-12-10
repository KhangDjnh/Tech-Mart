//import { forgotPassword } from "../../Backend/controllers/ForgotPassController.js";
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
    const url = `/cart/${userId}`;
    return api.get(url, setHeaders());
  },
  updateUserCart(userId, cartItems) {
    const url = `/cart/${userId}`;
    const payload = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
    }));
    return api.put(url, payload, setHeaders());
  },

  deleteUserCart(userId, cartItems) {
    //console.log("cartItems",cartItems);
    //console.log("cartItems",cartItems.cartItems[0]);
    const url = `/cart/${userId}/cart`;
    const payload = { cartItems: String(cartItems.cartItems[0]) };
    const res = api.post(url, payload, setHeaders());
    console.log('res: ',res);
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
    const url = `/comment/product/${productId}/`;
    return api.get(url, setHeaders());
  },

  createComment(comment) {
    const url = `/comment/`;
    console.log('newComment1: ', comment);

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment), // Chuyển dữ liệu thành JSON string
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Chuyển kết quả trả về thành JSON
    })
    .catch((error) => {
        console.error('Error in createComment:', error);
    });
  },

  reply(productId, commentId, comment) {
    const url = `/product/${productId}/comment/${commentId}`;
    return api.post(url, comment, setHeaders());
  },
};
