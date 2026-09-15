import axiosClient from './axiosClient';

export const postApi = {
  getAll: () => axiosClient.get('/post'),
  getById: (id) => axiosClient.get(`/post/${id}`),
  create: (data) => axiosClient.post('/post', data),
  update: (id, data) => axiosClient.put(`/post/${id}`, data),
  delete: (id) => axiosClient.delete(`/post/${id}`),
};
