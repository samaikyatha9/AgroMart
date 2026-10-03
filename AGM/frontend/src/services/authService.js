import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data?.token) {
      localStorage.setItem('agromart_token', response.data.token);
      localStorage.setItem('agromart_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    if (response.data?.token) {
      localStorage.setItem('agromart_token', response.data.token);
      localStorage.setItem('agromart_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('agromart_token');
    localStorage.removeItem('agromart_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('agromart_user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  getToken() {
    return localStorage.getItem('agromart_token');
  },

  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.put('/users/profile', profileData);
    if (response.data) {
      localStorage.setItem('agromart_user', JSON.stringify(response.data));
    }
    return response.data;
  }
};
