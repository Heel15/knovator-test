const postModel = require('../models/posts');

const create = (createPattern) => {
    return new Promise((resolve, reject) => {
        try {
            const temp = new postModel(createPattern);
            const data = temp.save();
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const find = (findPattern, selectPattern = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const data = postModel.find(findPattern, selectPattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const findOne = (findPattern, selectPattern = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const data = postModel.findOne(findPattern, selectPattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const deleteOne = (deletePattern) => {
    return new Promise((resolve, reject) => {
        try {
            const data = postModel.deleteOne(deletePattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const updateOne = (findPattern, updatePattern) => {
    return new Promise((resolve, reject) => {
        try {
            const data = postModel.updateOne(findPattern, updatePattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

const aggregate = (queryPattern) => {
    return new Promise((resolve, reject) => {
        try {
            const data = postModel.aggregate(queryPattern);
            resolve(data);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    find,
    create,
    findOne,
    deleteOne,
    updateOne,
    aggregate
}