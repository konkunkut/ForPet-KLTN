const express = require('express');

const auth= require('../Authen/login.authen');
const subComment = require('../controllers/subComment.controller');

const router = express.Router();

router.post('/createSubComment',auth.checkOauthToken,subComment.createSubComment);
router.get('/getSubCommentList',subComment.getSubcommentList);

module.exports = router;