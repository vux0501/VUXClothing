const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleWare } = require('../middleware/authMiddleware');
const CloudinaryController = require('../controllers/CloudinaryController');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.post('/refresh-token', UserController.refreshToken);

router.get('/getAllUsers', authMiddleWare, UserController.getAllUsers);
router.get('/get-detail-user/:id', authMiddleWare, UserController.getUser);
router.post('/update-user', authMiddleWare, CloudinaryController.uploadAvatar, UserController.updateUser);
// router.post('/update-user', UserController.updateUser);
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser);

module.exports = router;
