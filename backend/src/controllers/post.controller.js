const postService = require('../services/postService');

const getAllPost = async (req, res) => {
  try {
    const posts = await postService.getAllPostService();

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message || 'Post not found',
    });
  }
};

const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user?.id || '67c8f6e4d8b4c4a1b2c3d4e5',
    };

    const post = await postService.createPostService(postData);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create post',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePostService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message || 'Failed to update post',
    });
  }
};

// 5. Xóa bài viết
const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePostService(req.params.id);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message || 'Failed to delete post',
    });
  }
};

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
