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
                    type: 1,
                    message: 'The user is not defined',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUserEmail.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    type: 2,
                    message: 'Password incorrect',
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
                user: checkUserEmail,
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
            reject({ status: 'OK', message: 'User Id not found' });
        }
    });
};

const getAllUsers = (limit, page) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.count();
            const users = await User.find()
                .limit(limit)
                .skip(page * limit);
            console.log(users);
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

            const updateUser = await User.findByIdAndUpdate(userId, data, { new: true });

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
