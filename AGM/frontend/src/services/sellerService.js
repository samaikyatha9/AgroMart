import api from './api';

export const sellerService = {
  async getDashboard() {
    const response = await api.get('/seller/dashboard');
    return response.data;
  },

  async getProducts() {
    const response = await api.get('/seller/products');
    return response.data;
  },

  async addProduct(productData) {
    const response = await api.post('/seller/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/seller/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/seller/products/${id}`);
    return response.data;
  },

  async getOrders() {
    const response = await api.get('/seller/orders');
    return response.data;
  }
};
