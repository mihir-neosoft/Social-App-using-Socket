const express = require('express');
const router = express.Router();
const { getallusers, getuser, updateuser, deleteuser, followuser, unfollowuser } = require('../controllers/user');

// get all users
router.get('/', getallusers);
// get user
router.get('/:id', getuser);
// update user
router.put('/:id', updateuser);
// delete user
router.delete('/:id', deleteuser);
// follow user
router.put('/:id/follow', followuser);
// unfollow user
router.put('/:id/unfollow', unfollowuser);


module.exports = router;