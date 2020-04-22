const express = require('express');
const route = express.Router();
const authentication = require('../Authen/login.authen');
const news =require('../controllers/News.controler');
const {Aclclass} = require('../helper/acl_store.heiper');
const acl= Aclclass.getAcl;

//console.log(acl.Aclclass.getAcl);
//UserRouterAboveNews
route.post('/createNews',authentication.checkOauthToken,news.createNews);
//route.delete('/deleteNews/:idNews',authentication.checkOauthToken,acl.middleware(2),news.removeNews);
route.put('/editNews/:idNews',authentication.checkOauthToken,acl.middleware(2),news.editNews);
route.get('/getDetailNews/:newsId',news.getNewsId);
route.get('/getAllTags/:tags',news.getNewsTagsAll);
route.get('/getAllNews/:page',news.getNewsAll);
route.get('/getNewsLimit',news.getNewsLimit);
route.get('/getNewNews',news.getNewNews);
route.get('/getNewsTotal',news.getNewsTotal);
route.put('/upDateView/:newsId',news.upDateView);
route.get('/getUserBlogs',authentication.checkOauthToken,news.getUserBlogs);
route.put('/deleteNews/:id', news.deleteNews);
route.get('/getAllNews_ad', news.getAllNews_ad);

module.exports = route;