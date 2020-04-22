const express = require('express');
const route=express.Router();
const TypePlace= require('../controllers/typePlace.controller');

route.post('/createTypePlace',TypePlace.createTypePlace);
route.get('/getTypePlace/:id_type_place',TypePlace.getTypePlace);
route.put('/editTypePlace/:id_type_place',TypePlace.editTypePlace);
module.exports = route;