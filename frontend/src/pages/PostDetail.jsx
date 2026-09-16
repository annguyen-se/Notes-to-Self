// src/pages/PostDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, Trash2 } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';
import DeleteModal from '../components/DeleteModal';

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

  const confirmDelete = async () => {
    if (id) {
      await deletePost(id, () => {
        navigate('/');
      });
    }
  };

  if (isLoading) {
    return (
      <div className="reader-view page-reveal">
        <div className="zine-notice">
          <h4 className="zine-notice-title">Đang mở trang văn khố...</h4>
          <p className="zine-notice-text">Đang đối chiếu và bày biện bản thảo.</p>
        </div>
      </div>
    );
  }

  if (error || !currentPost) {
    return (
      <div className="reader-view page-reveal">
        <div className="zine-notice error">
          <h4 className="zine-notice-title">Không Thể Mở Bản Thảo</h4>
          <p className="zine-notice-text">{error || 'Bản thảo này không tồn tại hoặc đã bị rút lại.'}</p>
          <div style={{ marginTop: '16px' }}>
            <Link to="/" className="link-read">
              Quay lại Mục lục
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const authorId = currentPost.author?._id || currentPost.author;
  const isOwner = user && (user._id === authorId || user.id === authorId);

  const formattedDate = new Date(currentPost.createdAt).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const wordCount = currentPost.content ? currentPost.content.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 180));

  // Tách các đoạn văn theo dấu xuống dòng
  const paragraphs = (currentPost.content || '')
    .split(/\n\s*\n/)
    .filter((p) => p.trim().length > 0);

  return (
    <article className="reader-view page-reveal">
      {/* Nút quay lại */}
      <nav className="reader-back-nav">
        <Link to="/" className="reader-back-link">
          <ArrowLeft size={14} />
          <span>Quay lại Mục lục</span>
        </Link>
      </nav>

      {/* Đầu trang bài viết */}
      <header className="reader-header">
        <div className="reader-meta-stamp">
          <span className="essay-tag-pill">{currentPost.category || 'Tổng hợp'}</span>
          <span>{formattedDate}</span>
          <span>&bull;</span>
          <span>{wordCount} từ ({readTime} phút đọc)</span>
        </div>

        <h1 className="reader-title">{currentPost.title}</h1>

        <div className="reader-byline-bar">
          <div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--fg-muted)', display: 'block' }}>
              Chấp bút bởi
            </span>
            <span className="reader-author">
              {currentPost.author?.username || currentPost.author?.email || 'Vô danh'}
            </span>
          </div>

          {isOwner && (
            <div className="reader-actions">
              <Link
                to={`/edit/${currentPost._id}`}
                className="btn-inline-action"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Edit3 size={14} />
                <span>Chỉnh sửa</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="btn-inline-action btn-inline-danger"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={14} />
                <span>Xóa bài</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Nội dung bài viết (Có chữ hoa mở đầu Drop Cap ở đoạn đầu) */}
      <section className="reader-prose">
        {paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* Chân trang bài viết */}
      <footer className="reader-footer">
        <Link to="/" className="reader-back-link">
          <ArrowLeft size={14} />
          <span>Về trang chủ</span>
        </Link>
        <span>Kết thúc bản thảo</span>
      </footer>

      {/* Hộp thoại xác nhận xóa */}
      <DeleteModal
        isOpen={showDeleteModal}
        title={currentPost.title}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </article>
  );
}
