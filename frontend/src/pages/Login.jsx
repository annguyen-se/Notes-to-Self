import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className='max-w-md mx-auto bg-dark-surface p-6 rounded-lg border border-dark-border'>
      <h2 className='text-2xl font-bold text-slate-100 mb-4'>Đăng nhập</h2>

      {error && (
        <div className='mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg'>{error}</div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-slate-300 mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-100 focus:outline-none focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-slate-300 mb-1'>Mật khẩu</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-slate-100 focus:outline-none focus:border-primary'
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className='w-full py-2 bg-primary text-dark-bg font-semibold rounded-lg hover:bg-primary-dark transition disabled:opacity-50'>
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}
