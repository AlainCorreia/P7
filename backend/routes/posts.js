const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const verifyToken = require('../middleware/verifyToken');
const multer = require('../middleware/multer-config');

router.post('/', verifyToken, multer, postCtrl.createPost);
router.get('/', verifyToken, postCtrl.getPosts);
router.patch('/:id', verifyToken, multer, postCtrl.updatePost);
router.post('/:id/like', verifyToken, postCtrl.likePost);
router.delete('/:id', verifyToken, postCtrl.deletePost);

module.exports = router;
