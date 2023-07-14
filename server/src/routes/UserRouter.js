const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleWare } = require('../middleware/authMiddleware');

router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/refresh-token', UserController.refreshToken);

router.get('/getAllUsers', authMiddleWare, UserController.getAllUsers);
router.get('/get-detail-user/:id', UserController.getUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser);

module.exports = router;
