import { create } from 'zustand';
import { postApi } from '../api/postApi';

export const usePostStore = create((set) => ({
  posts: [],
  currentPost: null,
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await postApi.getAll();
      set({ posts: response.data.data || [], isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.error, isLoading: false });
    }
  },

  fetchPostById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await postApi.getById(id);
      set({ currentPost: response.data.data, isLoading: false });
    } catch (err) {
      set({ error: err.response?.data?.error || 'Không tìm thấy bài viết', isLoading: false });
    }
  },

  createPost: async (postData, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      const response = await postApi.create(postData);
      const newPost = response.data.data;
      set((state) => ({ posts: [newPost, ...state.posts], isLoading: false }));
      if (onSuccess) onSuccess();
    } catch (err) {
      set({ error: err.response?.data?.error || 'Tạo bài viết thất bại', isLoading: false });
    }
  },

  updatePost: async (id, updateData, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      const response = await postApi.update(id, updateData);
      const updatedPost = response.data.data;
      set((state) => ({
        posts: state.posts.map((p) => (p._id === id ? updatedPost : p)),
        currentPost: updatedPost,
        isLoading: false,
      }));
      if (onSuccess) onSuccess();
    } catch (err) {
      set({ error: err.response?.data?.error || 'Cập nhật bài viết thất bại', isLoading: false });
    }
  },

  deletePost: async (id, onSuccess) => {
    set({ isLoading: true, error: null });
    try {
      await postApi.delete(id);
      set((state) => ({
        posts: state.posts.filter((p) => p._id !== id),
        isLoading: false,
      }));
      if (onSuccess) onSuccess();
    } catch (err) {
      set({ error: err.response?.data?.error || 'Xóa bài viết thất bại', isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
