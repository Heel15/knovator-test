const userModel = require('../models/users');

const create = (createPattern) => {
    return new Promise((resolve, reject) => {
        try {
            const temp = new userModel(createPattern);
            const data = temp.save();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const findOne = (findPattern, selectPattern = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const data = userModel.findOne(findPattern, selectPattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    create,
    findOne
}