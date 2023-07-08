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

module.exports = { createUser, loginUser };
