const express = require('express');
const controllAddress = require('../controllers/address.controller');
const place = require('../controllers/place.controlle');
const auth = require('../Authen/login.authen');
const route = express.Router();
route.post('/createAddress',auth.checkOauthToken,place.createPlace,controllAddress.createAddress);
route.put('/editAddress/:id_address',auth.checkOauthToken,place.editPlace,controllAddress.editAddress);
route.delete('/deleteAddress/:id_address', auth.checkOauthToken,place.find_id_place,place.deletePlace,controllAddress.deleteAddress);
module.exports = route;