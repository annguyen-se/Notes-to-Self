// src/pages/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('Triết học');
  const [showColdStartNotice, setShowColdStartNotice] = useState(false);
  const navigate = useNavigate();

  const { register, isLoading, error } = useAuthStore();

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setTimeout(() => setShowColdStartNotice(true), 3000);
    } else {
      setShowColdStartNotice(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ username, email, password, major }, () => {
      navigate('/login');
    });
  };

  return (
    <div className='auth-wrapper page-reveal'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h2 className='auth-title'>Đăng Ký Tác Giả</h2>
          <p className='auth-subtitle'>Gia nhập văn khố của những người viết tự do</p>
        </header>

        {error && (
          <div className='zine-notice error' style={{ marginBottom: 'var(--sp-6)' }}>
            <h4 className='zine-notice-title'>Đăng ký không thành công</h4>
            <p className='zine-notice-text'>{error}</p>
          </div>
        )}

        {showColdStartNotice && (
          <div className='zine-notice' style={{ marginBottom: 'var(--sp-6)', borderColor: 'var(--color-primary)' }}>
            <p className='zine-notice-text'>
              ⏳ Máy chủ đang khởi động lại (gói miễn phí mất ~30-50s cho lần đầu). Vui lòng không tắt trang...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='manuscript-form'>
          <div className='form-field'>
            <label className='field-label' htmlFor='reg-user'>
              Tên người dùng / Bút danh
            </label>
            <input
              id='reg-user'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder='Ví dụ: S. Kierkegaard'
            />
          </div>

          <div className='form-field'>
            <label className='field-label' htmlFor='reg-email'>
              Địa chỉ Email
            </label>
            <input
              id='reg-email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='writer@notestoself.press'
            />
          </div>

          <div className='form-field'>
            <label className='field-label' htmlFor='reg-pass'>
              Mật khẩu bảo mật
            </label>
            <input
              id='reg-pass'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='••••••••••••'
            />
          </div>

          <div className='form-field'>
            <label className='field-label' htmlFor='reg-major'>
              Lĩnh vực quan tâm / Chuyên ngành
            </label>
            <select id='reg-major' value={major} onChange={(e) => setMajor(e.target.value)}>
              <option value='Triết học'>Triết học &amp; Phê bình</option>
              <option value='Văn chương'>Văn học so sánh</option>
              <option value='Công nghệ'>Điện toán &amp; Công nghệ</option>
              <option value='Mỹ học'>Mỹ học &amp; Thiết kế</option>
              <option value='Khác'>Nhân văn tổng hợp</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='btn-primary'
            style={{ width: '100%', marginTop: 'var(--sp-2)' }}>
            {isLoading ? (showColdStartNotice ? 'Đang khởi động máy chủ...' : 'Đang tạo hồ sơ...') : 'Hoàn tất đăng ký'}
          </button>
        </form>

        <div className='auth-footer-nav'>
          <span>Đã có tài khoản?</span>
          <Link to='/login'>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
