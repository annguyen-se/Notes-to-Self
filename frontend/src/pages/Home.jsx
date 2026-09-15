import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  Search,
  Plus,
  Trash2,
  Edit3,
  Clock,
  User,
  Tag,
  FileText,
  AlertCircle,
  Loader2,
  Eye,
  X,
  AlertTriangle,
} from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';

export default function Home() {
  const { posts, fetchPosts, deletePost, isLoading, error } = usePostStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deletePost(deleteId);
      setDeleteId(null);
    }
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className='space-y-8 animate-fadeIn'>
      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-2'>
            Danh sách bài viết
          </h1>
          <p className='text-slate-400 text-sm mt-1'>Cập nhật các bài viết công nghệ và tin tức mới nhất</p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='relative w-full sm:w-64'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
            <input
              type='text'
              placeholder='Tìm kiếm bài viết...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-9 pr-3.5 py-2 bg-dark-surface border border-dark-border rounded-md text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary text-sm transition-all duration-200'
            />
          </div>
          {user && (
            <Link
              to='/create'
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-dark-bg font-semibold rounded-md hover:bg-primary-dark transition-all duration-200 text-sm whitespace-nowrap shadow-md shadow-primary/10'>
              <Plus className='w-4 h-4' />
              <span>Tạo bài viết</span>
            </Link>
          )}
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className='flex flex-col items-center justify-center py-16 gap-3 text-slate-400'>
          <Loader2 className='w-8 h-8 animate-spin text-primary' />
          <p className='text-sm'>Đang tải dữ liệu bài viết...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className='p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md text-sm flex items-start gap-3'>
          <AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
          <div>
            <p className='font-medium'>Đã có lỗi xảy ra</p>
            <p className='text-red-400/80 text-xs mt-0.5'>{error}</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && filteredPosts.length === 0 && (
        <div className='text-center py-16 bg-dark-surface/50 rounded-xl border border-dark-border flex flex-col items-center gap-3'>
          <div className='p-3 bg-slate-800/80 rounded-full text-slate-400'>
            <FileText className='w-8 h-8' />
          </div>
          <p className='text-slate-300 font-medium'>Không tìm thấy bài viết nào.</p>
          <p className='text-slate-500 text-xs max-w-sm'>
            {search ? 'Thử tìm kiếm với từ khóa khác xem sao.' : 'Hãy là người đầu tiên tạo bài viết mới!'}
          </p>
        </div>
      )}

      {/* Posts grid with AutoAnimate */}
      {!isLoading && !error && filteredPosts.length > 0 && (
        <div ref={parent} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className='bg-dark-surface p-6 rounded-xl border border-dark-border flex flex-col justify-between hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group'>
              <div>
                <div className='flex items-center justify-between gap-2 mb-3'>
                  <span className='inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-800 text-primary text-xs font-medium rounded-full border border-dark-border'>
                    <Tag className='w-3 h-3' />
                    {post.category || 'General'}
                  </span>
                  <span className='inline-flex items-center gap-1 text-slate-500 text-xs'>
                    <Clock className='w-3 h-3' />
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h3 className='text-lg font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug'>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h3>
                <p className='text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed'>{post.content}</p>
              </div>

              <div className='pt-4 border-t border-dark-border/60 flex items-center justify-between text-xs text-slate-400'>
                <span className='inline-flex items-center gap-1.5 font-medium text-slate-400 truncate max-w-[140px]'>
                  <User className='w-3.5 h-3.5 text-slate-500' />
                  <span className='truncate'>{post.author?.username || post.author?.email || 'Ẩn danh'}</span>
                </span>
                <div className='flex items-center gap-2 font-medium shrink-0'>
                  <Link
                    to={`/post/${post._id}`}
                    className='inline-flex items-center gap-1 px-2.5 py-1 text-primary hover:bg-primary/10 rounded transition-all duration-150'>
                    <Eye className='w-3.5 h-3.5' />
                    <span>Chi tiết</span>
                  </Link>
                  {user && (user._id === post.author?._id || user._id === post.author) && (
                    <>
                      <Link
                        to={`/edit/${post._id}`}
                        className='inline-flex items-center gap-1 px-2 py-1 text-amber-400 hover:bg-amber-500/10 rounded transition-all duration-150'>
                        <Edit3 className='w-3.5 h-3.5' />
                        <span>Sửa</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className='inline-flex items-center gap-1 px-2 py-1 text-red-400 hover:bg-red-500/10 rounded transition-all duration-150'>
                        <Trash2 className='w-3.5 h-3.5' />
                        <span>Xóa</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn'>
          <div className='bg-dark-surface border border-dark-border rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4'>
            <div className='flex items-center justify-between border-b border-dark-border pb-3'>
              <div className='flex items-center gap-2 text-amber-400 font-semibold text-base'>
                <AlertTriangle className='w-5 h-5' />
                <span>Xác nhận xóa</span>
              </div>
              <button
                onClick={() => setDeleteId(null)}
                className='text-slate-400 hover:text-slate-200 transition-colors p-1 rounded'>
                <X className='w-4 h-4' />
              </button>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed'>
              Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.
            </p>
            <div className='flex items-center justify-end gap-3 pt-2'>
              <button
                onClick={() => setDeleteId(null)}
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
