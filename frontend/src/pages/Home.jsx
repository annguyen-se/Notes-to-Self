// src/pages/Home.jsx
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Search, Edit3, Trash2 } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';
import DeleteModal from '../components/DeleteModal';

export default function Home() {
  const { posts, fetchPosts, deletePost, isLoading, error } = usePostStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [postListRef] = useAutoAnimate();
  const [categoryListRef] = useAutoAnimate();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Lấy danh sách thể loại duy nhất
  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['Tất cả', ...Array.from(set)];
  }, [posts]);

  // Lọc bài viết theo tìm kiếm và thể loại
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === 'Tất cả' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !search ||
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.content?.toLowerCase().includes(search.toLowerCase()) ||
        post.category?.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [posts, search, selectedCategory]);

  const confirmDelete = async () => {
    if (deleteTarget) {
      await deletePost(deleteTarget._id);
      setDeleteTarget(null);
    }
  };

  const calculateReadTime = (text = '') => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  };

  return (
    <div className="zine-index-layout page-reveal">
      {/* Cột mục lục lệch chuẩn bên trái */}
      <aside className="zine-folio-rail">
        <div>
          <span className="folio-section-title">01 / TRA CỨU BẢN THẢO</span>
          <div className="folio-search-wrap">
            <Search className="folio-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, suy niệm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="folio-search-input"
            />
          </div>
        </div>

        <div>
          <span className="folio-section-title">02 / PHÂN LOẠI ĐỀ TÀI</span>
          <ul ref={categoryListRef} className="folio-category-list">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`folio-category-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  <span>{cat}</span>
                  <span style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>
                    {cat === 'Tất cả'
                      ? posts.length
                      : posts.filter((p) => p.category === cat).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="folio-quote-box">
          <p>
            &ldquo;Viết lách là khắc từng điểm tựa nhỏ trên vách đá sừng sững của những tạp âm trần thế.&rdquo;
          </p>
          <span
            style={{
              display: 'block',
              marginTop: '8px',
              fontSize: 'var(--text-xs)',
              fontStyle: 'normal',
              color: 'var(--fg)',
            }}
          >
            — Trích mục lục suy ngẫm số 04
          </span>
        </div>
      </aside>

      {/* Dòng chảy bài viết chính */}
      <section className="zine-essay-stream">
        {isLoading && (
          <div className="zine-notice">
            <h4 className="zine-notice-title">Đang tra cứu kho lưu trữ...</h4>
            <p className="zine-notice-text">Đang đối chiếu các bản thảo số hóa.</p>
          </div>
        )}

        {error && (
          <div className="zine-notice error">
            <h4 className="zine-notice-title">Gián đoạn truy xuất</h4>
            <p className="zine-notice-text">{error}</p>
          </div>
        )}

        {!isLoading && filteredPosts.length === 0 && (
          <div className="zine-notice">
            <h4 className="zine-notice-title">Không tìm thấy ghi chép</h4>
            <p className="zine-notice-text">
              {search
                ? `Không có bài viết nào khớp với từ khóa "${search}".`
                : 'Chưa có bản thảo nào được ghi nhận trong phân loại này.'}
            </p>
          </div>
        )}

        {/* Danh sách bài viết tích hợp @formkit/auto-animate */}
        <div ref={postListRef}>
          {filteredPosts.map((post, idx) => {
            const authorId = post.author?._id || post.author;
            const isOwner = user && (user._id === authorId || user.id === authorId);
            const indexNumber = String(idx + 1).padStart(2, '0');
            const dateFormatted = new Date(post.createdAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <article key={post._id} className="zine-essay-row">
                <div className="essay-index-col">
                  <span>№ {indexNumber}</span>
                </div>

                <div className="essay-body-col">
                  <div className="essay-meta-line">
                    <span className="essay-tag-pill">{post.category || 'Tổng hợp'}</span>
                    <span>{dateFormatted}</span>
                    <span>&bull;</span>
                    <span>{calculateReadTime(post.content)} phút đọc</span>
                  </div>

                  <h3 className="essay-title">
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </h3>

                  <p className="essay-excerpt">{post.content}</p>

                  <div className="essay-footer-line">
                    <span className="essay-author-label">
                      <span>Chấp bút bởi</span>
                      <strong style={{ color: 'var(--fg)' }}>
                        {post.author?.username || post.author?.email || 'Vô danh'}
                      </strong>
                    </span>

                    <div className="essay-controls">
                      <Link to={`/post/${post._id}`} className="link-read">
                        Đọc bản thảo
                      </Link>

                      {isOwner && (
                        <>
                          <Link
                            to={`/edit/${post._id}`}
                            className="btn-inline-action"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            title="Chỉnh sửa bản thảo"
                          >
                            <Edit3 size={13} />
                            <span>Sửa</span>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(post)}
                            className="btn-inline-action btn-inline-danger"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                            title="Xóa bản thảo"
                          >
                            <Trash2 size={13} />
                            <span>Xóa</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Hộp thoại xác nhận xóa */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={deleteTarget?.title}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
