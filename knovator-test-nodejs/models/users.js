const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const user = mongoose.model('users', userSchema);
module.exports = user;