const userService = require('../services/users'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    { validator, userSchema } = require('../common/validator'),
    { errorCode, createCode, invalidPayloadCode, alreadyExitsCode, incorrectCred } = require('../common/allConstant').responseMessages;

const createUser = (req, res) => {
    try {
        const { error, value } = validator(userSchema, req.body);

        if (!error) {
            let { username, password } = value;
            userService.findOne({ username }).then((data) => {
                if (!data) {
                    password = bcrypt.hashSync(password, 12);
                    userService.create({ username, password }).then(() => {
                        return res.json(createCode);
                    }).catch((e) => {
                        return res.json(errorCode);
                    });
                } else {
                    return res.json(alreadyExitsCode);
                }
            }).catch((e) => {
                return res.json({ ...errorCode, errorMessage: e.message });
            });
        } else {
            return res.json({ ...invalidPayloadCode, error });
        }
    } catch (e) {
        return res.json({ ...errorCode, errorMessage: e.message });
    }
}

const login = (req, res) => {
    try {
        const { error, value } = validator(userSchema, req.body);
        if (!error) {
            const { username, password } = value;
            userService.findOne({ username }).then((data) => {
                if (data) {
                    if (bcrypt.compareSync(password, data.password)) {
                        return res.json({
                            status: 200,
                            userData: { _id: data._id, username: data.username },
                            message: "Logged in successfully.",
                            token: jwt.sign({ _id: data._id, username: data.username }, process.env.JWT_ACCESS_TOKEN),
                        });
                    } else {
                        return res.json(incorrectCred);
                    }
                } else {
                    return res.json(incorrectCred);
                }
            }).catch((e) => {
                return res.json({ ...errorCode, errorMessage: e.message });
            });
        } else {
            return res.json({ ...invalidPayloadCode, error });
        }
    } catch (e) {
        return res.json({ ...errorCode, errorMessage: e.message });
    }
}

module.exports = {
    createUser,
    login
}