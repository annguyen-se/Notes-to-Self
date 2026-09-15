import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

function App() {
  return (
    <div className='min-h-screen bg-dark-bg text-slate-100 flex flex-col justify-between antialiased'>
      <div>
        <Navbar />
        <main className='container mx-auto px-4 py-8 max-w-6xl'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/edit/:id' element={<EditPost />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
