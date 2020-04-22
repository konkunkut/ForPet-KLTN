const rate = require('../controllers/rate.controler');
const auth = require('../Authen/login.authen');
const app = require('express');
const route = app.Router();

route.post('/createRate',auth.checkOauthToken,rate.createRate);
route.put('/updateRate',auth.checkOauthToken,rate.upDateRate);

route.get('/getRatePlace/:id_place',rate.getRatePlace);
route.get('/getRateUser/:id_place', auth.checkOauthToken, rate.getRateUser);
module.exports=route;