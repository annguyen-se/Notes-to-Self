const User = require('../models/user.model');
const { hashPassword } = require('../utils/harsh');
const bcrypt = require('bcryptjs');

const registerService = async (userData) => {
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

const loginService = async (email, password) => {
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

  user.password = undefined;
  return user;
};

module.exports = {
  registerService,
  loginService,
};
