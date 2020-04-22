const express = require('express');
const route = express.Router();

const controlPlace = require('../controllers/place.controlle');
const auth= require('../Authen/login.authen')

route.post('/createPlace',auth.checkOauthToken,controlPlace.createPlace);
route.put('/editPlace/:id_place',auth.checkOauthToken,controlPlace.editPlace);
route.get('/getUserPlaces', auth.checkOauthToken,controlPlace.getUserPlaces);
route.get('/getAllPlace/:page',controlPlace.getAllPlace);
route.put('/deletePlace/:id_place', auth.checkOauthToken,controlPlace.deletePlace);
route.get('/getDetailPlaces/:id_Place',controlPlace.getDetailPlaces);
route.get('/getPlaceTotal',controlPlace.getPlaceTotal);
route.get('/getAllPlaces_ad', controlPlace.getAllPlaces_ad);
route.get('getDeletedPlaces', controlPlace.getDeletedPlaces);
route.put('/deletePlaces_ad/:id',controlPlace.deletePlaces_ad);
route.get('/getNewestPlace', controlPlace.getNewestPlace);
module.exports =route;