import mongoose, { Schema } from 'mongoose';
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    minlength: [3, 'Tiêu dề tối đa 3 ký tự'],
    maxlength: [200, 'Tiêu đề tối đa 200 ký tự'],
  },

  content: { type: String, require: true, minlength: [10, 'Nội dung tối thiểu 10 ký tự'] },
  author: { type: Schema.ObjectId, ref: 'Users' },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
