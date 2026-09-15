import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Edit3,
  ArrowLeft,
  AlertCircle,
  Loader2,
  Tag,
  Heading,
  FileText,
  Save,
} from 'lucide-react';
import { usePostStore } from '../store/usePostStore';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, fetchPostById, updatePost, isLoading, error } = usePostStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
  }, [id, fetchPostById]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title || '');
      setCategory(currentPost.category || 'General');
      setContent(currentPost.content || '');
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, { title, category, content }, () => {
      navigate(`/post/${id}`);
    });
  };

  if (isLoading && !currentPost) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-3 text-slate-400'>
        <Loader2 className='w-8 h-8 animate-spin text-primary' />
        <p className='text-sm'>Đang tải thông tin bài viết...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto space-y-6'>
      <Link
        to={`/post/${id}`}
        className='inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors duration-150 font-medium'>
        <ArrowLeft className='w-4 h-4' />
        <span>Quay lại bài viết</span>
      </Link>

      <div className='bg-dark-surface p-6 sm:p-8 rounded-xl border border-dark-border shadow-xl space-y-6'>
        <div className='flex items-center gap-3 pb-5 border-b border-dark-border'>
          <div className='p-2.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20'>
            <Edit3 className='w-6 h-6' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-100 tracking-tight'>Chỉnh sửa bài viết</h2>
            <p className='text-slate-400 text-xs mt-0.5'>Cập nhật thông tin bài viết của bạn</p>
          </div>
        </div>

        {error && (
          <div className='p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-start gap-3'>
            <AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
            <div>
              <p className='font-medium'>Không thể cập nhật bài viết</p>
              <p className='text-red-400/80 text-xs mt-0.5'>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='flex items-center gap-2 text-sm font-medium text-slate-300 mb-2'>
              <Heading className='w-4 h-4 text-amber-400' />
              <span>Tiêu đề bài viết</span>
            </label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              maxLength={200}
              placeholder='Nhập tiêu đề (tối thiểu 3 ký tự)...'
              className='w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition-all duration-200'
            />
          </div>

          <div>
            <label className='flex items-center gap-2 text-sm font-medium text-slate-300 mb-2'>
              <Tag className='w-4 h-4 text-amber-400' />
              <span>Thể loại (Category)</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 focus:outline-none focus:border-amber-400 text-sm transition-all duration-200 cursor-pointer'>
              <option value='General'>General</option>
              <option value='Technology'>Technology</option>
              <option value='Programming'>Programming</option>
              <option value='Life'>Life</option>
            </select>
          </div>

          <div>
            <label className='flex items-center gap-2 text-sm font-medium text-slate-300 mb-2'>
              <FileText className='w-4 h-4 text-amber-400' />
              <span>Nội dung bài viết</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              minLength={10}
              rows={8}
              placeholder='Nhập nội dung bài viết (tối thiểu 10 ký tự)...'
              className='w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm resize-y transition-all duration-200 leading-relaxed'
            />
          </div>

          <div className='flex items-center justify-end gap-3 pt-3 border-t border-dark-border'>
            <button
              type='button'
              onClick={() => navigate(`/post/${id}`)}
              className='px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-all duration-150'>
              Hủy
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-dark-bg font-semibold rounded-lg hover:bg-amber-400 transition-all duration-200 disabled:opacity-50 text-sm shadow-md shadow-amber-500/10'>
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className='w-4 h-4' />
                  <span>Lưu thay đổi</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
