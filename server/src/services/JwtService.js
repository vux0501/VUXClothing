const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const generalAccessToken = async (payload) => {
    const access_token = jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: '1h',
        },
    );
    return access_token;
};

const generalRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(
        {
            ...payload,
        },
        process.env.FRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: '365d',
        },
    );
    return refresh_token;
};

const refreshToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.FRESH_TOKEN_SECRET_KEY, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication',
                    });
                }

                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });

                resolve({
                    message: 'SUCCESS',
                    status: 'OK',
                    access_token: access_token,
                });
            });
        } catch (e) {
            reject({ status: 'OK', message: 'refresh token failled' });
        }
    });
};

module.exports = { generalAccessToken, generalRefreshToken, refreshToken };
