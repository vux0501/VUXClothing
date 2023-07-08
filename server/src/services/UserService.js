const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

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

module.exports = { createUser };
