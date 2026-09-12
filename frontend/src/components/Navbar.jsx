import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className='bg-dark-surface border-b border-dark-border sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='text-xl font-bold text-primary flex items-center gap-2'>
            <span>My Blog</span>
          </Link>
          <div className='flex items-center gap-4'>
            <Link to='/' className='text-slate-300 hover:text-primary transition'>
              Trang chủ
            </Link>

            {token ? (
              <>
                <Link to='/create' className='text-slate-300 hover:text-primary transition'>
                  Viết bài
                </Link>
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition'>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='text-slate-300 hover:text-primary transition'>
                  Đăng nhập
                </Link>
                <Link
                  to='/register'
                  className='px-4 py-2 bg-primary text-dark-bg font-medium rounded-lg hover:bg-primary-dark transition'>
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
