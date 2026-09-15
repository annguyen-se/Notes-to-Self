import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

function Navbar() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-dark-surface/90 border-b border-dark-border sticky top-0 z-50 backdrop-blur-md'>
      <div className='container mx-auto px-6'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='text-xl font-bold tracking-tight text-primary hover:opacity-90 transition'>
            My Blog
          </Link>
          <div className='flex items-center gap-5 text-sm font-medium'>
            <Link to='/' className='text-slate-300 hover:text-slate-100 transition'>
              Trang chủ
            </Link>

            {token ? (
              <>
                <Link to='/create' className='text-slate-300 hover:text-slate-100 transition'>
                  Viết bài
                </Link>
                <span className='text-slate-400 font-normal'>Hi, {user?.username || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className='px-3.5 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md hover:bg-red-500/20 transition'>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='text-slate-300 hover:text-slate-100 transition'>
                  Đăng nhập
                </Link>
                <Link
                  to='/register'
                  className='px-4 py-1.5 bg-primary text-dark-bg font-semibold rounded-md hover:bg-primary-dark transition'>
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
