const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        max: 500,
        required: true,
    },
    img: {
        type: String,
        default: "https://source.unsplash.com/random"
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);