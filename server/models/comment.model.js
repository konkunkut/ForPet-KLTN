const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    id_User: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        unique: false
    },
    id_place: {
        type: mongoose.Schema.ObjectId,
        ref: 'Place',
        unique: false
    },
    content: {
        type: String,
        require: true
    },
    list_Comment:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubComment',
        require:false
    }]
    ,
    date: {
        type: Date,
        default: Date.now
    }
});
comment.index({ "id_place": 1, "id_User": 1 })
comment.index({ 'id_place': 1, 'id_User': 1 }, { unique: true })
module.exports = mongoose.model('Comment', comment);