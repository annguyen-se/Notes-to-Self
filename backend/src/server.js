const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { authRoute, postRoute } = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Đã kết nối thành công với MongoDB'))
  .catch((err) => console.error('Lỗi kết nối DB:', err));

app.get('/', (req, res) => {
  res.send('Backend Express MVC đã sẵn sàng!');
});

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});
