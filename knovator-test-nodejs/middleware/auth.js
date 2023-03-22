const jwt = require('jsonwebtoken'),
    dotenv = require('dotenv'),
    ObjectId = require('mongoose').Types.ObjectId,
    userService = require('../services/users'),
    { errorCode, unauthorizedCode } = require('../common/allConstant').responseMessages;

dotenv.config();

const auth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (authorization) {
            const token = authorization.split(" ")[1];
            if (token) {
                jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decoded) => {
                    if (decoded) {
                        if (ObjectId.isValid(decoded._id) && decoded.username) {
                            await userService.findOne({ _id: decoded._id }).then((data) => {
                                if (data) {
                                    req.userId = data._id;
                                    req.username = data.username;
                                    next();
                                } else {
                                    return res.json(unauthorizedCode);
                                }
                            }).catch((e) => {
                                return res.json(errorCode);
                            });
                        } else {
                            return res.json(errorCode);
                        }
                    } else {
                        return res.json(errorCode);
                    }
                });
            } else {
                return res.json(unauthorizedCode);
            }
        } else {
            return res.json(unauthorizedCode);
        }
    } catch (e) {
        return res.json(errorCode);
    }
}

module.exports = auth;