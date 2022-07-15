const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const verifyToken = require('../middleware/verifyToken');
const multer = require('../middleware/multer-config');

router.post('/', verifyToken, multer, postCtrl.createPost);
router.get('/', verifyToken, postCtrl.getPosts);

// router.post('/login', userCtrl.login);
// router.get('/logout', verifyToken, userCtrl.logout);
// router.get('/user', verifyToken, userCtrl.getUser);

module.exports = router;
