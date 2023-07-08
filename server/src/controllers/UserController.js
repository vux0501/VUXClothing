const UserSevice = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const res = await UserSevice.createUser();
        return res.status(200).json();
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = { createUser };
