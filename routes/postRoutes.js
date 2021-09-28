const express = require('express');
const router = express.Router();

const {createPost}=require("../controllers/postController");
const {fetchPosts,fetchPost}=require("../controllers/postController");

const auth = require('../utils/auth');


router.post('/create_post',auth,createPost);
router.get('/posts/:id/:page', auth, fetchPosts); // ye uper he rahe ga
router.get('/post/:id', auth, fetchPost);

module.exports = router;

