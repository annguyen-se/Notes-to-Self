import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  major: { type: String, default: 'IT' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('Users', UserSchema, 'users');
export default User;
