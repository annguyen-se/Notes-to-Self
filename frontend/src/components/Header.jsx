// src/components/Header.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { PenTool, LogOut, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className='zine-masthead'>
      <div className='zine-container'>
        <div className='masthead-meta-bar'>
          <div className='masthead-meta-left'>
            <span>{currentDate}</span>
          </div>
          <div className='masthead-meta-right'>
            <span>LƯU HÀNH: NỘI BỘ</span>
            <span>ẤN BẢN: ĐIỆN TỬ</span>
          </div>
        </div>

        <div className='masthead-core'>
          <div className='masthead-brand'>
            <Link to='/' className='masthead-title'>
              Notes <span className='italic'>to Self</span>
            </Link>
            <p className='masthead-tagline'>
              Một chốn riêng độc lập — nơi lưu giữ những tiểu luận, những tiếng nói bất đồng, và những niềm suy tưởng
              lặng lẽ
            </p>
          </div>

          <nav className='masthead-nav'>
            <Link to='/' className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Mục lục
            </Link>

            {token ? (
              <>
                <Link to='/create' className='nav-action-btn' title='Chấp bút bản thảo mới'>
                  <PenTool size={13} />
                  <span>Viết bài</span>
                </Link>

                <div className='nav-user-stamp'>
                  Tác giả: <strong>{user?.username || 'Bạn đọc'}</strong>
                </div>

                <button
                  onClick={handleLogout}
                  className='btn-inline-action'
                  title='Thoát phiên đăng nhập'
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LogOut size={13} />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <LogIn size={13} />
                  <span>Đăng nhập</span>
                </Link>

                <Link
                  to='/register'
                  className='nav-action-btn'
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <UserPlus size={13} />
                  <span>Đăng ký</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
