const postService = require('../services/postService');
const HTTP_STATUS = require('../constants/httpStatus');

const getAllPost = async (req, res) => {
  try {
    const posts = await postService.getAllPostService();

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      success: false,
      error: error.message || 'Internal server error',
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostByIdService(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      statusCode: HTTP_STATUS.NOT_FOUND,
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

    res.status(HTTP_STATUS.CREATED).json({
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      success: false,
      error: error.message || 'Failed to create post',
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePostService(req.params.id, req.body);

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      statusCode: HTTP_STATUS.NOT_FOUND,
      success: false,
      error: error.message || 'Failed to update post',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePostService(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      statusCode: HTTP_STATUS.NOT_FOUND,
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
