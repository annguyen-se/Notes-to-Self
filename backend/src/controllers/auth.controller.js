const { registerService, loginService } = require('../services/authService');

const registerUser = async (req, res) => {
  try {
    const result = await registerService(req.body);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Registration failed',
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    const result = await loginService(email, password);

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message || 'Login failed',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
