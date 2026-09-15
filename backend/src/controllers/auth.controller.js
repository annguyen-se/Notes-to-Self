const { registerService, loginService } = require('../services/authService');
const HTTP_STATUS = require('../constants/httpStatus');

const registerUser = async (req, res) => {
  try {
    const user = await registerService(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: 'User registered successfully',
      user,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      success: false,
      error: error.message || 'Registration failed',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        statusCode: HTTP_STATUS.BAD_REQUEST,
        success: false,
        error: 'Email and password are required',
      });
    }

    const user = await loginService(email, password);

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: 'Login successful',
      user,
      token: 'token-' + user._id,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      success: false,
      error: error.message || 'Login failed',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
