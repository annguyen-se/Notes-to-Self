import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, GraduationCap, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState('IT');
  const navigate = useNavigate();

  const { register, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ username, email, password, major }, () => {
      navigate('/login');
    });
  };

  return (
    <div className='max-w-md mx-auto pt-4 pb-12 space-y-6'>
      <div className='bg-dark-surface p-6 sm:p-8 rounded-xl border border-dark-border shadow-2xl space-y-6'>
        <div className='text-center space-y-2'>
          <div className='inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full border border-primary/20 mb-1'>
            <UserPlus className='w-6 h-6' />
          </div>
          <h2 className='text-2xl font-bold text-slate-100 tracking-tight'>Tạo tài khoản mới</h2>
          <p className='text-slate-400 text-xs'>Tham gia cộng đồng và chia sẻ bài viết ngay hôm nay</p>
        </div>

        {error && (
          <div className='p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-start gap-3'>
            <AlertCircle className='w-5 h-5 shrink-0 mt-0.5' />
            <div>
              <p className='font-medium'>Đăng ký thất bại</p>
              <p className='text-red-400/80 text-xs mt-0.5'>{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Tên người dùng (Username)</label>
            <div className='relative'>
              <User className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='nguyenvana'
                className='w-full pl-10 pr-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary text-sm transition-all duration-200'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Email</label>
            <div className='relative'>
              <Mail className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='nhap@email.com'
                className='w-full pl-10 pr-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary text-sm transition-all duration-200'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Mật khẩu</label>
            <div className='relative'>
              <Lock className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' />
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='••••••••'
                className='w-full pl-10 pr-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-primary text-sm transition-all duration-200'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-medium text-slate-300 mb-1.5'>Chuyên ngành / Ngành học</label>
            <div className='relative'>
              <GraduationCap className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none' />
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className='w-full pl-10 pr-3.5 py-2.5 bg-dark-bg border border-dark-border rounded-lg text-slate-100 focus:outline-none focus:border-primary text-sm transition-all duration-200 cursor-pointer'>
                <option value='IT'>Công nghệ thông tin (IT)</option>
                <option value='Business'>Kinh tế / Quản trị</option>
                <option value='Design'>Thiết kế / Mỹ thuật</option>
                <option value='Languages'>Ngoại ngữ</option>
                <option value='Other'>Khác</option>
              </select>
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className='w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 mt-2 bg-primary text-dark-bg font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 text-sm shadow-md shadow-primary/10'>
            {isLoading ? (
              <>
                <Loader2 className='w-4 h-4 animate-spin' />
                <span>Đang đăng ký...</span>
              </>
            ) : (
              <>
                <span>Đăng ký tài khoản</span>
                <ArrowRight className='w-4 h-4' />
              </>
            )}
          </button>
        </form>

        <div className='pt-4 border-t border-dark-border text-center text-xs text-slate-400'>
          <span>Đã có tài khoản? </span>
          <Link to='/login' className='text-primary font-medium hover:underline ml-1'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
