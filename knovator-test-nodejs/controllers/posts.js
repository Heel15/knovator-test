const postService = require('../services/posts'),
    ObjectId = require('mongoose').Types.ObjectId,
    { validator, postSchema, coordsSchema } = require('../common/validator'),
    { errorCode, createCode, invalidPayloadCode, resourceDeleted, resourceUpdated } = require('../common/allConstant').responseMessages;

const createPost = (req, res) => {
    try {
        const { error, value } = validator(postSchema, req.body);

        if (!error) {
            postService.create(value).then((data) => {
                return res.json({ ...createCode, data });
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

const deletePost = (req, res) => {
    try {
        const { userId } = req;
        const { postId } = req.params;
        if (ObjectId.isValid(postId)) {
            postService.findOne({ _id: postId, createdBy: userId }).then((data) => {
                if (data) {
                    postService.deleteOne({ _id: postId }).then(() => {
                        return res.json(resourceDeleted)
                    }).catch((e) => {
                        return res.json({ ...errorCode, errorMessage: e.message });
                    });
                } else {
                    return res.json({
                        status: 200,
                        message: 'You only have right to your posts.'
                    });
                }
            }).catch((e) => {
                return res.json({ ...errorCode, errorMessage: e.message });
            });
        } else {
            return res.json(invalidPayloadCode);
        }
    } catch (e) {
        return res.json(errorCode);
    }
}

const updatePost = (req, res) => {
    try {
        const { userId } = req;
        const { postId, isActive, title, body } = req.body;
        if (ObjectId.isValid(postId)) {
            let updatePattern = {}
            if (typeof isActive === "boolean") {
                updatePattern.isActive = isActive;
            }
            if (title?.length) {
                updatePattern.title = title;
            }
            if (body?.length) {
                updatePattern.body = body;
            }

            postService.findOne({ _id: postId, createdBy: userId }).then((data) => {
                if (data) {
                    postService.updateOne({ _id: postId }, updatePattern).then(() => {
                        return res.json(resourceUpdated);
                    }).catch((e) => {
                        return res.json({ ...errorCode, errorMessage: e.message });
                    });
                } else {
                    return res.json({
                        status: 200,
                        message: 'You only have right to your posts.'
                    });
                }
            }).catch((e) => {
                return res.json({ ...errorCode, errorMessage: e.message });
            });
        } else {
            return res.json(invalidPayloadCode);
        }
    } catch (e) {
        return res.json({ ...errorCode, errorMessage: e.message });
    }
}


const activeInactiveCount = async (req, res) => {
    try {
        // i can use aggregate with addFields but for now its very simple and understandable way so i go with this flow for count
        const activePostData = await postService.find({ isActive: true }),
            inactivePostData = await postService.find({ isActive: false }),
            activePostLen = activePostData.length,
            inactivePostLen = inactivePostData.length;

        // if length have not found then it goes 0 for both.
        return res.json({ status: 200, activePostCount: activePostLen, inactivePostCount: inactivePostLen })
    } catch (e) {
        return res.json({ ...errorCode, errorMessage: e.message });
    }
}


// this api return post data from 1000 meter radius from given lat and long
const getPostByCoords = (req, res) => {
    try {
        let { lat, long } = req.params;
        lat = parseFloat(lat);
        long = parseFloat(long);

        // its very generic if i go for validate number type of lat and long into validator even if i did code for checking number there, but when value is empty then validator will throw an error
        const { error } = validator(coordsSchema, { lat, long });

        if (!error) {
            let queryPattern = [];
            queryPattern.push({
                $geoNear: {
                    near: { type: "Point", coordinates: [long, lat] },
                    distanceField: "dist.calculated",
                    maxDistance: 1000,
                }
            });
            postService.aggregate(queryPattern).then((data) => {
                return res.json(data);
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
    createPost,
    deletePost,
    updatePost,
    getPostByCoords,
    activeInactiveCount,
}