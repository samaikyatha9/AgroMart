import api from './api';

export const productService = {
  async getAllProducts(sortBy = 'newest') {
    const response = await api.get(`/products?sortBy=${sortBy}`);
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async searchProducts(keyword) {
    const response = await api.get(`/products/search?keyword=${encodeURIComponent(keyword)}`);
    return response.data;
  },

  async getByCategory(categoryId) {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  async filterProducts(params) {
    const query = new URLSearchParams();
    if (params.categoryId) query.append('categoryId', params.categoryId);
    if (params.minPrice !== undefined && params.minPrice !== '') query.append('minPrice', params.minPrice);
    if (params.maxPrice !== undefined && params.maxPrice !== '') query.append('maxPrice', params.maxPrice);
    const response = await api.get(`/products/filter?${query.toString()}`);
    return response.data;
  },

  async createProduct(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  }
};
