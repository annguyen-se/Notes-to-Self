const express = require('express');
const { verifyAuth } = require('../middleware/auth.middleware');
const { getAllPost, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

const router = express.Router();

router.get('/', getAllPost);
router.get('/:id', verifyAuth, getPostById);
router.post('/', verifyAuth, createPost);
router.put('/:id', verifyAuth, updatePost);
router.delete('/:id', verifyAuth, deletePost);

module.exports = router;
