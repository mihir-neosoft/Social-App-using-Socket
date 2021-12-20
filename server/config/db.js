const mongoose = require('mongoose');
const DB = "mongodb://localhost:27017/post_comment_app";

const connect_db = async () => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true });
        console.log("MongoDB Connected.");
    } catch (err) { console.log(err.message); }
}

module.exports = connect_db;