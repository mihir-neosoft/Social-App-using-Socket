const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');

// register
router.post('/register', register);
// login
router.post('/login', login);
// default
router.get('/', (req, res) => { res.json({ message: "auth routes" }); });

module.exports = router;