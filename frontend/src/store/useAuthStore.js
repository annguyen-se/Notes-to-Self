import { create } from 'zustand';
import { authApi } from '../api/authApi';

export const useAuthStore = create((set) => ({
  // State
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Action: Đăng ký
  register: async (userData, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.register(userData);
      set({ isLoading: false, error: null });
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Đăng ký thất bại!';
      set({ error: errorMessage, isLoading: false });
    }
  },

  login: async (credentials, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token || 'token-placeholder');

      set({ user, token: token || 'token-placeholder', isLoading: false, error: null });

      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Đăng nhập thất bại!';
      set({ error: errorMessage, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, error: null });
  },

  clearError: () => set({ error: null }),
}));
