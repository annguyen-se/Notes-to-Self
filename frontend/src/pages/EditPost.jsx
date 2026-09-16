// src/pages/EditPost.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, fetchPostById, updatePost, isLoading, error } = usePostStore();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Literature');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      fetchPostById(id);
    }
  }, [id, fetchPostById]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title || '');
      setCategory(currentPost.category || 'Literature');
      setContent(currentPost.content || '');
    }
  }, [currentPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await updatePost(id, { title, category, content }, () => {
      navigate(`/post/${id}`);
    });
  };

  if (isLoading && !currentPost) {
    return (
      <div className='manuscript-desk page-reveal'>
        <div className='zine-notice'>
          <h4 className='zine-notice-title'>Locating Manuscript Folio...</h4>
          <p className='zine-notice-text'>Retrieving original draft from archives.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='manuscript-desk page-reveal'>
      <nav className='reader-back-nav'>
        <Link to={`/post/${id}`} className='reader-back-link'>
          <ArrowLeft size={14} />
          <span>Hủy chỉnh sửa</span>
        </Link>
      </nav>

      <header className='desk-header'>
        <h1 className='desk-heading'>Chỉnh sửa bản thảo</h1>
        <p className='desk-subheading'>
          Các sửa đổi sẽ được đăng ký với dấu thời gian được cập nhật trong văn khố lưu trữ.
        </p>
      </header>

      {error && (
        <div className='zine-notice error' style={{ marginBottom: 'var(--sp-6)' }}>
          <h4 className='zine-notice-title'>Lỗi sửa đổi</h4>
          <p className='zine-notice-text'>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className='manuscript-form'>
        <div className='form-field'>
          <label className='field-label' htmlFor='edit-title'>
            Tiêu đề bài viết <span className='req'>*</span>
          </label>
          <input
            id='edit-title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={200}
            className='input-title'
          />
        </div>

        <div className='form-field'>
          <label className='field-label' htmlFor='edit-category'>
            Chủ đề phân loại
          </label>
          <select id='edit-category' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value='Văn chương'>Văn chương</option>
            <option value='Phê bình'>Phê bình</option>
            <option value='Công nghệ'>Công nghệ</option>
            <option value='Tản văn'>Tản văn</option>
            <option value='Ghi chép'>Ghi chép</option>
            <option value='Triết học'>Triết học</option>
            <option value='Tổng hợp'>Tổng hợp</option>
          </select>
        </div>

        <div className='form-field'>
          <label className='field-label' htmlFor='edit-content'>
            Nội dung bản thảo <span className='req'>*</span>
          </label>
          <textarea
            id='edit-content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            rows={12}
            className='input-textarea'
          />
        </div>

        <div className='desk-actions'>
          <button type='button' onClick={() => navigate(`/post/${id}`)} className='btn-secondary'>
            Hủy bỏ
          </button>
          <button type='submit' disabled={isLoading} className='btn-primary'>
            {isLoading ? 'Đang lưu sửa đổi...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  );
}
