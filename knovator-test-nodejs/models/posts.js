const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        location: {
            type: { type: String, default: "Point" },
            coordinates: [Number] // must be add first longitude and then latitude
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

postSchema.index({ "location": "2dsphere" });
const post = mongoose.model('posts', postSchema);
module.exports = post;