const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { email, name, phone, password, avatar } = newUser;
        try {
            const checkUserEmail = await User.findOne({
                email: email,
            });
            const checkUserPhone = await User.findOne({
                phone: phone,
            });
            const hash = bcrypt.hashSync(password, 10);

            if (checkUserEmail !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Email đã tồn tại',
                });
            } else if (checkUserPhone !== null) {
                resolve({
                    status: 'ERR',
                    message: 'Số điện thoại đã tồn tại',
                });
            } else {
                const createdUser = await User.create({
                    name: name,
                    email: email,
                    password: hash,
                    phone: phone,
                    avatar: avatar,
                });
                if (createdUser) {
                    resolve({
                        status: 'OK',
                        message: 'Create new user successfully',
                        data: createdUser,
                    });
                }
            }
        } catch (e) {
            reject({});
        }
    });
};

const loginUser = (user) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = user;
        try {
            const checkUserEmail = await User.findOne({
                email: email,
            });

            if (checkUserEmail === null) {
                resolve({
                    status: 'ERR',
                    message: 'Email chưa được đăng ký.',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUserEmail.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Sai mật khẩu',
                });
            }

            const access_token = await generalAccessToken({
                id: checkUserEmail.id,
                isAdmin: checkUserEmail.isAdmin,
            });
            const refresh_token = await generalRefreshToken({
                id: checkUserEmail.id,
                isAdmin: checkUserEmail.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'OK',
                access_token: access_token,
                refresh_token: refresh_token,
            });
        } catch (e) {
            reject({});
        }
    });
};

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserId = await User.findOne({
                _id: userId,
            });
            if (checkUserId === null) {
                resolve({
                    status: 'OK',
                    message: 'user not found',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                user: checkUserId,
            });
        } catch (e) {
            reject({ status: 'ERR', message: 'User Id not found' });
        }
    });
};

const getAllUsers = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.count();

            //filter
            if (filter) {
                const type = filter[0];
                const usersFilter = await User.find({ [filter[0]]: { $regex: filter[1] } })
                    .limit(limit)
                    .skip(page * limit);
                resolve({
                    message: 'SUCCESS',
                    status: 'OK',
                    products: usersFilter,
                    totalProduct: totalUser,
                    pageCurrent: +page + 1,
                    totalPage: Math.ceil(totalUser / limit),
                });
            }
            //sort
            if (sort) {
                const objectSort = {};
                objectSort[sort[0]] = sort[1];

                const productsSort = await User.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    message: 'SUCCESS',
                    status: 'OK',
                    products: productsSort,
                    totalProduct: totalUser,
                    pageCurrent: +page + 1,
                    totalPage: Math.ceil(totalUser / limit),
                });
            }

            const users = await User.find()
                .limit(limit)
                .skip(page * limit);

            resolve({
                message: 'SUCCESS',
                status: 'OK',
                users: users,
                totalUser: totalUser,
                currentPage: +page + 1,
                totalPage: Math.ceil(totalUser / limit),
            });
        } catch (e) {
            reject({ status: 'OK', message: 'ERROR' });
        }
    });
};

const updateUser = (userId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserId = await User.findOne({
                _id: userId,
            });
            if (checkUserId === null) {
                resolve({
                    status: 'OK',
                    message: 'user not found',
                });
            }

            const updateUser = await User.findByIdAndUpdate(userId, { ...data, avatar: data.url }, { new: true });

            resolve({
                status: 'OK',
                message: 'Updated',
                data: updateUser,
            });
        } catch (e) {
            reject({ status: 'OK', message: 'ERROR' });
        }
    });
};

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserId = await User.findOne({
                _id: userId,
            });
            if (checkUserId === null) {
                resolve({
                    status: 'OK',
                    message: 'user not found',
                });
            }

            await User.findByIdAndDelete(userId);

            resolve({
                status: 'OK',
                message: 'Deleted ' + checkUserId.name,
            });
        } catch (e) {
            reject({ status: 'OK', message: 'User Id not found' });
        }
    });
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getUser, getAllUsers };
