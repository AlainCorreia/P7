const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout',verifyToken, userCtrl.logout);
router.get('/user', verifyToken, userCtrl.getUser)

module.exports = router;