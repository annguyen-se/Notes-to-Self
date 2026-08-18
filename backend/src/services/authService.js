import User from '../models/user.model.js';
import { hashPassword } from '../utils/harsh.js';

export const registerService = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ ...userData, password: hashedPassword });
  return newUser;
};

export const loginService = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  user.password = undefined; // Remove password from the user object before returning
  return user;
};
