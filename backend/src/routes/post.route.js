const express = require('express');
const { getAllPost, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

const router = express.Router();

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
