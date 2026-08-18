import { registerService, loginService } from '../services/authService.js';

export const registerUser = async (req, res) => {
  try {
    const result = await registerService(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.status(201).json({ message: 'User registered successfully', user: result.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await loginUser(email, password);
    res.status(200).json({ ...user._doc, message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
