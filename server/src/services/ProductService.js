const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, description } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });

            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The product is already',
                });
            } else {
                const createdProduct = await Product.create({
                    name: name,
                    image: image,
                    type: type,
                    price: price,
                    countInStock: countInStock,
                    description: description,
                });
                if (createdProduct) {
                    resolve({
                        status: 'OK',
                        message: 'Create new product successfully',
                        data: createdProduct,
                    });
                }
            }
        } catch (e) {
            reject({});
        }
    });
};

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();
            //filter
            if (filter) {
                const type = filter[0];
                const productsFilter = await Product.find({ [filter[0]]: { $regex: filter[1] } })
                    .limit(limit)
                    .skip(page * limit);
                resolve({
                    message: 'SUCCESS',
                    status: 'OK',
                    products: productsFilter,
                    totalProduct: totalProduct,
                    pageCurrent: +page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }
            //sort
            if (sort) {
                const objectSort = {};
                objectSort[sort[0]] = sort[1];

                const productsSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    message: 'SUCCESS',
                    status: 'OK',
                    products: productsSort,
                    totalProduct: totalProduct,
                    pageCurrent: +page + 1,
                    totalPage: Math.ceil(totalProduct / limit),
                });
            }

            const products = await Product.find()
                .limit(limit)
                .skip(page * limit);

            resolve({
                message: 'SUCCESS',
                status: 'OK',
                products: products,
                totalProduct: totalProduct,
                pageCurrent: +page + 1,
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (e) {
            reject({});
        }
    });
};

const getDetailProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: productId,
            });
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'product not found',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                product: product,
            });
        } catch (e) {
            reject({
                message: 'Product not found',
            });
        }
    });
};

const updateProduct = (productId, dataUpdate) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: productId });

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'product not found',
                });
            }
            const updateProduct = await Product.findByIdAndUpdate(productId, dataUpdate, { new: true });

            resolve({
                status: 'OK',
                message: 'Updated this product',
                product: updateProduct,
            });
        } catch (e) {
            reject({
                message: 'Error',
            });
        }
    });
};

const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: productId });

            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'product not found',
                });
            }
            await Product.findByIdAndDelete(productId);

            resolve({
                status: 'OK',
                message: 'Deleted this product',
            });
        } catch (e) {
            reject({
                message: 'Error',
            });
        }
    });
};

module.exports = { createProduct, getAllProduct, getDetailProduct, updateProduct, deleteProduct };
