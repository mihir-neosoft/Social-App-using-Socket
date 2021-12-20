const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require('../models/User');

const createpost = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updatepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userid === req.body.userid) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message: "post updated" });
        } else {
            res.status(403), json({ message: "you can update your post only" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deletepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userid === req.body.userid) {
            await post.deleteOne();
            res.status(200).json({ message: "post deleted" });
        } else {
            res.status(403).json({ message: "you can delete your post only" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getpost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getalluserpost = async (req, res) => {
    try {
        const currentuser = await User.findById(req.body.userid);
        const userpost = await Post.find({ userid: currentuser._id });
        const followingspost = await Promise.all(
            currentuser.followings.map((followingsid) => {
                return Post.find({ userid: followingsid });
            })
        );
        res.status(200).json(userpost.concat(...followingspost));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getallpost = async (req, res) => {
    try {
        const allpost = await Post.find().sort({ _id: -1 });
        res.status(200).json(allpost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const likepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userid)) {
            await post.updateOne({ $push: { likes: req.body.userid } });
            res.status(200).json("the post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userid } });
            res.status(200).json("the post has been unliked");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { createpost, updatepost, deletepost, getpost, getalluserpost, getallpost, likepost };