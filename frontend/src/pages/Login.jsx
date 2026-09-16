// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password }, () => {
      navigate('/');
    });
  };

  return (
    <div className='auth-wrapper page-reveal'>
      <div className='auth-card'>
        <header className='auth-header'>
          <h2 className='auth-title'>Đăng Nhập</h2>
          <p className='auth-subtitle'>Đăng nhập cộng tác viên để quản lý bản thảo</p>
        </header>

        {error && (
          <div className='zine-notice error' style={{ marginBottom: 'var(--sp-6)' }}>
            <h4 className='zine-notice-title'>Truy cập thất bại</h4>
            <p className='zine-notice-text'>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='manuscript-form'>
          <div className='form-field'>
            <label className='field-label' htmlFor='login-email'>
              Email
            </label>
            <input
              id='login-email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='author@marginalia.press'
            />
          </div>

          <div className='form-field'>
            <label className='field-label' htmlFor='login-pass'>
              Mật khẩu
            </label>
            <input
              id='login-pass'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='••••••••••••'
            />
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='btn-primary'
            style={{ width: '100%', marginTop: 'var(--sp-2)' }}>
            {isLoading ? 'Xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className='auth-footer-nav'>
          <span>Chưa có tài khoản?</span>
          <Link to='/register'>Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}
