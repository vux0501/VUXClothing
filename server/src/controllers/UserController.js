const UserSevice = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, avatar } = req.body;
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email.',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal to the Confirm Password',
            });
        }

        const response = await UserSevice.createUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = { createUser };
