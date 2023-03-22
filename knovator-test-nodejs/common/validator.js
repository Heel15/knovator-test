const joi = require('joi');

const validator = (schema, payload) => {
    return schema.validate(payload, { abortEarly: false });
}

const userSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(8).max(10).required(),
});

const postSchema = joi.object({
    createdBy: joi.string().required(),
    title: joi.string().min(1).max(30).required(),
    body: joi.string().min(1).max(500).required(),
    location: {
        coordinates: joi.array().items(joi.number()).max(2).required()
    }
});

const coordsSchema = joi.object({
    lat: joi.number().required(),
    long: joi.number().required(),
})

module.exports = {
    validator,
    userSchema,
    postSchema,
    coordsSchema
}