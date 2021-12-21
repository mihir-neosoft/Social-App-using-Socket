const express = require('express');
const router = express.Router();
const { createpost, updatepost, deletepost, getpost, getalluserpost, getallpost, likepost, commentonpost } = require('../controllers/post');

// create post
router.post('/', createpost);
// update post
// router.put('/:id', updatepost);
// delete post
router.delete('/:id', deletepost);
// get post
router.get('/:id', getpost);
// get all user posts
router.post('/mypost/all', getalluserpost);
// get all posts
router.get('/', getallpost);
// like post
router.put('/:id/like', likepost);
// comment on post
router.put('/:id/addcomment', commentonpost);

module.exports = router;