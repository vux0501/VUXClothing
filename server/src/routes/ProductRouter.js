const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleware');

router.post('/create', authMiddleWare, ProductController.createProduct);
router.get('/getAll', ProductController.getAllProduct);
router.get('/get-detail-product/:id', ProductController.getDetailProduct);
router.put('/update/:id', authMiddleWare, ProductController.updateProduct);
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct);

module.exports = router;
