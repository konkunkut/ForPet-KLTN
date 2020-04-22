const mongoose = require('mongoose');
const typePlace = new mongoose.Schema({
    type_place:{
        trim:true,
        type: String,
        require: true
    }
})
module.exports = mongoose.model('TypePlace',typePlace);