const express = require('express');
const router = express.Router();

const {createPost}=require("../controllers/postController");
const {fetchPosts,fetchPost,updateValidations,updatePost,updateImage,deletePost,home,postDetails,postComment}=require("../controllers/postController");

const auth = require('../utils/auth');


router.post('/create_post',auth,createPost);
router.post('/update', [auth, updateValidations], updatePost);

router.get('/posts/:id/:page', auth, fetchPosts); // ye uper he rahe ga
router.get('/post/:id', auth, fetchPost);
router.post('/updateImage', auth, updateImage);
router.get('/delete/:id', auth, deletePost);
router.get('/home/:page', home); // we no need of auth here
router.get('/explore/:id', postDetails);
router.post('/comment', auth, postComment);


module.exports = router;

