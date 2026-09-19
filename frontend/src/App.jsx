import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

export default function App() {
  useEffect(() => {
    // ponytail: ping wake-up render backend sớm
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://localhost:5000';
    fetch(apiUrl).catch(() => {});
  }, []);

  return (
    <div className='zine-shell'>
      <Header />
      <main className='zine-main zine-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
