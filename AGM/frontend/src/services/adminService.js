import api from './api';

export const adminService = {
  async getDashboard() {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  async getUsers() {
    const response = await api.get('/admin/users');
    return response.data;
  },

  async toggleUserStatus(userId) {
    const response = await api.put(`/admin/users/${userId}/toggle-status`);
    return response.data;
  },

  async getOrders() {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  async getProducts() {
    const response = await api.get('/admin/products');
    return response.data;
  }
};
