// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// const SECRET = "23c48bfc26bd4f6347b0dece088eb463";

const register = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
        if (existingUser) return res.status(400).json({ message: "User already exist" });
        if (password !== confirmpassword) return res.status(400).json({ message: "Password don't match" });
        const hashedpassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, email, password: hashedpassword });
        res.status(200).json({ user });
        // const token = jwt.sign({ email: user.email, id: user._id }, SECRET, { expiresIn: "1h" })
        // res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { username: email }] });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        res.status(200).json({ user: existingUser });
        // const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "1h" });
        // res.status(200).json({ user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}
module.exports = { register, login };