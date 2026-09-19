// src/pages/CreatePost.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { CATEGORIES } from '../constants/categories';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const { createPost, isLoading, error } = usePostStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await createPost({ title, category, tags: parsedTags, content }, () => {
      navigate('/');
    });
  };

  return (
    <div className="manuscript-desk page-reveal">
      <nav className="reader-back-nav">
        <Link to="/" className="reader-back-link">
          <ArrowLeft size={14} />
          <span>Hủy bản thảo</span>
        </Link>
      </nav>

      <header className="desk-header">
        <h1 className="desk-heading">Khởi Tạo Bản Thảo Mới</h1>
        <p className="desk-subheading">
          Mọi bài viết sẽ được sắp xếp theo trình tự thời gian và lưu giữ trong văn khố chung.
        </p>
      </header>

      {error && (
        <div className="zine-notice error" style={{ marginBottom: 'var(--sp-6)' }}>
          <h4 className="zine-notice-title">Không thể lưu bản thảo</h4>
          <p className="zine-notice-text">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="manuscript-form">
        <div className="form-field">
          <label className="field-label" htmlFor="title">
            Tiêu đề bài viết <span className="req">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={200}
            placeholder="Đặt cho suy niệm một cái tên..."
            className="input-title"
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="category">
            Chủ đề phân loại
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="tags">
            Thẻ phân loại / Tags (cách nhau bởi dấu phẩy)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Ví dụ: React, Express, MongoDB..."
            className="input-title"
            style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-sans)' }}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="content">
            Nội dung bản thảo <span className="req">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            rows={12}
            placeholder="Bắt đầu dòng suy tưởng tại đây. Các đoạn văn được phân tách bằng một dòng trống..."
            className="input-textarea"
          />
        </div>

        <div className="desk-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? 'Đang lưu...' : 'Gửi vào văn khố'}
          </button>
        </div>
      </form>
    </div>
  );
}
