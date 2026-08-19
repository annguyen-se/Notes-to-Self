const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.route.js');

const app = express();
app.use(morgan('dev'));
const PORT = 5000;

dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Đã kết nối thành công với MongoDB'))
  .catch((err) => console.error(' Lỗi kết nối DB:', err));

app.get('/', (req, res) => {
  res.send('Backend Express MVC đã sẵn sàng!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});
