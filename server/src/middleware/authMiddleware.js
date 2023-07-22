const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    //for user
    // const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'The authentication error',
                status: 'Error',
            });
        }

        if (user?.isAdmin) {
            next();
        } else {
            return res.status(401).json({
                message: 'You must be an admin',
                status: 'Error',
            });
        }
    });
};

module.exports = { authMiddleWare };
