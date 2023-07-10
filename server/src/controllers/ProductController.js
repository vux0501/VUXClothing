const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, description } = req.body;

        if (!name || !image || !type || !price || !countInStock || !description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.',
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllProduct();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const response = await ProductService.getDetailProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const dataUpdate = req.body;
        const response = await ProductService.updateProduct(productId, dataUpdate);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct };
