import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSendName = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/welcome', {
        username: name,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  useEffect(() => {
    // Gọi API từ Backend Express
    axios
      .get('http://localhost:5000/api/info')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Kết nối React + Express</h1>
      {data && data.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map((user) => (
            <div key={user._id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <p>
                <strong>Tên:</strong> {user.username}
              </p>
              <p>
                <strong>Chuyên ngành:</strong> {user.major}
              </p>
            </div>
          ))}
        </div>
      ) : data ? (
        <p>Không có dữ liệu người dùng.</p>
      ) : (
        <p>Đang tải dữ liệu từ Server...</p>
      )}
      <div style={{ padding: '20px' }}>
        <h2>Gửi dữ liệu lên Server</h2>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nhập tên của bạn' />
        <button onClick={handleSendName}>Gửi lên Express</button>

        {message && <p style={{ color: 'blue' }}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
