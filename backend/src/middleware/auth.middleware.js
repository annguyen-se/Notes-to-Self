const User = require('../models/user.model');
const HTTP_STATUS = require('../constants/httpStatus');

const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Chưa đăng nhập' });
    }

    const token = authHeader.split(' ')[1];
    const userId = token.replace('token-', '');

    const user = await User.findById(userId);
    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Người dùng không tồn tại' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Token không hợp lệ' });
  }
};

module.exports = { verifyAuth };
