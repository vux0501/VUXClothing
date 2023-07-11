const UserSevice = require('../services/UserService');
const JwtSevice = require('../services/JwtService');

const createUser = async (req, res) => {
    try {
        const { email, name, phone, password, confirmPassword, avatar } = req.body;
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isCheckEmail = reg.test(email);

        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầy đủ trường dữ liệu!',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không đúng định dạng.',
            });
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mật khẩu và Mật khẩu nhập lại không khớp.',
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
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required.',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email.',
            });
        }

        const response = await UserSevice.loginUser(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(200).json({
                message: 'The token is required',
            });
        }
        const response = await JwtSevice.refreshToken(token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                message: 'userId not found',
            });
        }

        const response = await UserSevice.getUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { limit, page } = req.query;
        const response = await UserSevice.getAllUsers(limit || 100, page || 0);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                message: 'userId not found',
            });
        }
        const response = await UserSevice.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                message: 'userId not found',
            });
        }

        const response = await UserSevice.deleteUser(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = { createUser, loginUser, updateUser, deleteUser, getUser, getAllUsers, refreshToken };
