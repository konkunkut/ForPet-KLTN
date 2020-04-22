const mongoose = require('mongoose');

const datetime = require('date-time');

console.log(datetime({showTimeZone: true}))
const News = new mongoose.Schema({
    id_user:{
        type: mongoose.Schema.ObjectId, ref: 'User'
    },
    title:{
        type: String,
        trim: true,
        require: true
    },
    decription: {
        type: String,
        require: false,
        trim: true
    },
    content:{
        type: String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
        
    },
    tags:{
        type: String,
        require: true,
        trim:true
    },
    pictures:[{
        type: String
    }],
    view:{
        type: Number,
        require: false,
    },
    deleted:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('News',News);