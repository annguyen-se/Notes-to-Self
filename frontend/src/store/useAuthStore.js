import { create } from 'zustand';
import { authApi } from '../api/authApi';

export const useAuthStore = create((set) => ({
  // State
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Action: Đăng nhập
  login: async (credentials, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;

      // Lưu vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Cập nhật State Zustand
      set({ user, token, isLoading: false, error: null });

      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Đăng nhập thất bại!';
      set({ error: errorMessage, isLoading: false });
    }
  },

  // Action: Đăng xuất
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, error: null });
  },

  // Action: Xóa báo lỗi
  clearError: () => set({ error: null }),
}));
