const express = require('express');
const router = express.Router();

const {createPost}=require("../controllers/postController");
const {fetchPost}=require("../controllers/postController");

const auth = require('../utils/auth');


router.post('/create_post',auth,createPost);
router.get('/post/:id', auth, fetchPost); // ye uper he rahe ga

module.exports = router;