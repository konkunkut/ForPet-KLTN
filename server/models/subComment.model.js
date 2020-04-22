const mongoose = require('mongoose');
const subComment = new mongoose.Schema({
    id_User_subComment: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SubComment', subComment);