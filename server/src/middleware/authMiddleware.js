const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication error',
                status: 'Error',
            });
        }
        const { payload } = user;
        if (payload.isAdmin) {
            next();
        } else {
            return res.status(404).json({
                message: 'You must be an admin',
                status: 'Error',
            });
        }
    });
};

module.exports = { authMiddleWare };
