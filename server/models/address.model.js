const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    sub_district:{
        type: String,
        require:true,
        trim: true
    },
    street:{
        type: String,
        require: true,
        trim: true
    },
    district:{
        type:String,
        require:true,
        trim: true
    },
    city:{
        type:String,
        trim: true,
        require: true
    },
    id_place:{
        type: mongoose.Schema.ObjectId,
        ref:'Place'
    }
})

module.exports = mongoose.model('Address',Address);