const Post = require('../models/post.model');

const getAllPostService = async () => {
  const posts = await Post.find().populate('author', 'username email').sort({ createdAt: -1 });
  return posts;
};

const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId).populate('author', 'username email');
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

const createPostService = async (postData) => {
  const { title, content, author, category } = postData;

  if (!title || !content || !author) {
    throw new Error('Title, content and author are required');
  }

  const post = await Post.create({
    title,
    content,
    author,
    category: category || 'General',
  });

  return await post.populate('author', 'username email');
};

const updatePostService = async (postId, updateData) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      ...updateData,
      updatedAt: Date.now(),
    },
    { new: true, runValidators: true },
  ).populate('author', 'username email');
  if (!post) {
    throw new Error('Post not found');
  }

  return post;
};

const deletePostService = async (postId) => {
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  return { message: 'Post deleted successfully' };
};

module.exports = { getAllPostService, getPostByIdService, createPostService, updatePostService, deletePostService };
