const mongoose = require('mongoose');
require('./user.model');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Tiêu đề tối thiểu 3 ký tự'],
    maxlength: [200, 'Tiêu đề tối đa 200 ký tự'],
  },
  content: {
    type: String,
    required: true,
    minlength: [10, 'Nội dung tối thiểu 10 ký tự'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    default: 'General',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
