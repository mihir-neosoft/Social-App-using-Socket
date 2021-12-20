const User = require('../models/User');
const mongoose = require('mongoose');

const getallusers = async (req, res) => {
    try {
        const allusers = await User.find().sort({ _id: -1 });
        res.status(200).json(allusers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const getuser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const updateuser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, confirmpassword } = req.body;
    try {

    } catch (error) {

    }
}
const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {

    } catch (error) {

    }
}
const followuser = async (req, res) => {
    const { id } = req.params;
    const { _id, username } = req.body;
    console.log(id, _id, username);
    if (id !== _id) {
        try {
            const user = await User.findById(id);
            const currentuser = await User.findById(_id);
            if (!user.followers.includes(_id)) {
                await user.updateOne({ $push: { followers: _id } });
                await currentuser.updateOne({ $push: { followings: id } });
                res.status(200).json({ message: "user has been followed" });
            } else {
                res.status(403).json({ message: "you already follow this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: "you cant follow yourself" });
    }
}
const unfollowuser = async (req, res) => {
    const { id } = req.params;
    const { _id, username } = req.body;
    if (id !== _id) {
        try {
            const user = await User.findById(id);
            const currentuser = await User.findById(_id);
            if (user.followers.includes(_id)) {
                await user.updateOne({ $pull: { followers: _id } });
                await currentuser.updateOne({ $pull: { followings: id } });
                res.status(200).json({ message: "user unfollowed" });
            } else {
                res.status(403).json({ message: "you dont follow this user" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(403).json({ message: "you cant unfollow yourself" });
    }
}
module.exports = { getallusers, getuser, updateuser, deleteuser, followuser, unfollowuser };