import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <div className='min-h-screen bg-dark-bg'>
      <Navbar />
      <main className='container mx-auto px-4 py-8'>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
