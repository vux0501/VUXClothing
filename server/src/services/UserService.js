const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, avatar } = newUser;
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
                    status: 'OK',
                    message: 'The email is already',
                });
            } else if (checkUserPhone !== null) {
                resolve({
                    status: 'OK',
                    message: 'The phone is already',
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
                    status: 'OK',
                    message: 'The user is not defined',
                });
            }
            const comparePassword = bcrypt.compareSync(password, checkUserEmail.password);
            if (!comparePassword) {
                resolve({
                    status: 'OK',
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

const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find();
            console.log(users);
            resolve({
                message: 'SUCCESS',
                status: 'OK',
                users: users,
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
