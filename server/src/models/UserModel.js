const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: Number, require: true },
        avatar: { type: String, default: null },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
    },
    {
        timeStamp: true,
    },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
