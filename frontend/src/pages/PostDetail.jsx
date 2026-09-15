import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Edit3,
  Trash2,
  AlertCircle,
  Loader2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, fetchPostById, deletePost, isLoading, error } = usePostStore();
  const { user } = useAuthStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
  }, [id, fetchPostById]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deletePost(id, () => {
      navigate('/');
    });
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-3 text-slate-400'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
        <p className='text-sm'>Đang tải bài viết...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-xl mx-auto my-12 p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center space-y-3'>
        <AlertCircle className='w-10 h-10 mx-auto text-red-400' />
        <h3 className='font-semibold text-base'>Không thể tải bài viết</h3>
        <p className='text-xs text-red-400/80'>{error}</p>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline pt-2'>
          <ArrowLeft className='w-3.5 h-3.5' />
          <span>Quay lại danh sách bài viết</span>
        </Link>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className='max-w-xl mx-auto my-12 p-8 bg-dark-surface border border-dark-border rounded-xl text-center space-y-3'>
        <p className='text-slate-400 text-sm'>Không tìm thấy bài viết.</p>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline'>
          <ArrowLeft className='w-3.5 h-3.5' />
          <span>Quay lại trang chủ</span>
        </Link>
      </div>
    );
  }

  const isAuthor = user && (user._id === currentPost.author?._id || user._id === currentPost.author);

  return (
    <div className='max-w-3xl mx-auto space-y-6 animate-fadeIn'>
      <Link
        to='/'
        className='inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-150 font-medium'>
        <ArrowLeft className='w-4 h-4' />
        <span>Quay lại danh sách bài viết</span>
      </Link>

      <div className='bg-dark-surface p-6 sm:p-10 rounded-xl border border-dark-border shadow-2xl space-y-8'>
        {/* Header Section */}
        <div className='space-y-4 border-b border-dark-border/80 pb-6'>
          <div className='flex items-center justify-between flex-wrap gap-3'>
            <span className='inline-flex items-center gap-1 px-3 py-1 bg-slate-800 text-primary text-xs font-medium rounded-full border border-dark-border'>
              <Tag className='w-3.5 h-3.5' />
              {currentPost.category || 'General'}
            </span>
            <span className='inline-flex items-center gap-1.5 text-slate-400 text-xs'>
              <Calendar className='w-3.5 h-3.5 text-slate-500' />
              <span>Đăng ngày: {new Date(currentPost.createdAt).toLocaleDateString('vi-VN')}</span>
            </span>
          </div>

          <h1 className='text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight leading-snug'>
            {currentPost.title}
          </h1>

          <div className='flex items-center justify-between flex-wrap gap-4 pt-2 text-sm text-slate-400'>
            <div className='flex items-center gap-2'>
              <div className='p-2 bg-slate-800 rounded-full text-slate-300 border border-dark-border'>
                <User className='w-4 h-4' />
              </div>
              <div>
                <p className='text-xs text-slate-500'>Tác giả</p>
                <p className='text-slate-200 font-medium text-xs sm:text-sm'>
                  {currentPost.author?.username || currentPost.author?.email || 'Ẩn danh'}
                </p>
              </div>
            </div>

            {isAuthor && (
              <div className='flex items-center gap-2.5'>
                <Link
                  to={`/edit/${currentPost._id}`}
                  className='inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 text-xs font-medium transition-all duration-150'>
                  <Edit3 className='w-3.5 h-3.5' />
                  <span>Chỉnh sửa</span>
                </Link>
                <button
                  onClick={handleDelete}
                  className='inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 text-xs font-medium transition-all duration-150'>
                  <Trash2 className='w-3.5 h-3.5' />
                  <span>Xóa bài</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className='text-slate-200 leading-relaxed whitespace-pre-wrap text-base sm:text-lg font-normal tracking-wide space-y-4 min-h-[120px]'>
          {currentPost.content}
        </div>

        {/* Footer */}
        <div className='pt-6 border-t border-dark-border/80 flex items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium'>
            <ArrowLeft className='w-4 h-4' />
            <span>Quay lại trang chủ</span>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn'>
          <div className='bg-dark-surface border border-dark-border rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4'>
            <div className='flex items-center justify-between border-b border-dark-border pb-3'>
              <div className='flex items-center gap-2 text-amber-400 font-semibold text-base'>
                <AlertTriangle className='w-5 h-5' />
                <span>Xác nhận xóa</span>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='text-slate-400 hover:text-slate-200 transition-colors p-1 rounded'>
                <X className='w-4 h-4' />
              </button>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed'>
              Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.
            </p>
            <div className='flex items-center justify-end gap-3 pt-2'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-all duration-150'>
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className='inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md shadow-md transition-all duration-150'>
                <Trash2 className='w-4 h-4' />
                <span>Xóa bài viết</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
