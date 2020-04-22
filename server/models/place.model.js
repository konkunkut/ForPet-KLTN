const mongoose = require('mongoose');
const Place = new mongoose.Schema({
    name_place: {
        type: String,
        require: true,
        trim: true
    },
    phone: {
        type: String,
        require: true,
        trim: true
    },
    stress: {
        type: String,
        require: true,
        trim: true
    },
    dictrict: {
        type: String,
        require: true,
        trim: true
    },
    city: {
        type: String,
        require: true,
        trim: true
    },
    createBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    id_type_place: {
        type: String,
        require: true,
        trim: true
    },
    lat: {
        // type: mongoose.Types.Decimal128,
        type: String,
        require: false
    },
    lng: {
        // type: mongoose.Types.Decimal128,
        type: String,
        require: false
    },
    decription: {
        type: String,
        require: false,
        trim: true
    },
    deleted:{
        type: Boolean,
        default: false
    },
    picture: [{
        type: String,
        require: false
    }]
})
module.exports = mongoose.model('Place', Place);