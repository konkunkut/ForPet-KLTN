const auth= require('../Authen/login.authen');
const Comment = require('../controllers/comment.controller');
const subComment= require('../controllers/subComment.controller');
const express = require('express');

const route = express.Router();

route.post('/createComment', auth.checkOauthToken,Comment.createComment);
route.get('/getPlaceComment/:id_place',Comment.getPlaceComments);
route.get('/getListSubCmt/:id_Comment',Comment.getListSubCmt);
module.exports = route;