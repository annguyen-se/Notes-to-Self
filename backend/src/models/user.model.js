const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  major: { type: String, default: 'IT' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema, 'users');
module.exports = User;
