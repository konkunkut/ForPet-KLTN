const comment = require('../models/comment.model');

const createComment = (req, res) => {
    //console.log(req.decoded._id)
    const Comment = new comment({
        id_User: req.decoded._id
        ,
        id_place: req.body.id_place,
        content: req.body.content
    })

    Comment.save((err, result) => {
        if (err) {
            return res.status('400').json(err);
        }
        else {

            if (!result) {
                return res.status('200').json({
                    message: 'creare not success',
                    success: false
                })
            }
            return res.status('200').json({
                message: 'created success',
                data: result,
                success: true
            })
        }
    })
}

const getPlaceComments = (req, res, next) => {
    const id_place = req.params.id_place;
    comment.find({ id_place: id_place })
        .sort({ 'date': -1 })
        .populate('list_Comment')
        .exec((err, result) => {
            if (err) {
                return res.status('400').json(err);
            }
            else {
                if (!result) {
                    return res.status('200').json({
                        message: 'not found comment',
                        data: null,
                        success: false
                    })
                }
                else {
                    return res.status('200').json({
                        message: 'List comment and subComment',
                        data: result,
                        success: true
                    })

                }
            }
        })
}

const getListSubCmt=(req, res)=>{
    var id = req.params.id_Comment;
    console.log('id : '+id);
    comment.findById(id)
        .populate('list_Comment')
        .exec((err, result)=>{
            if (err) {
                return res.status('400').json(err);
            }
            else {
                if (!result) {
                    return res.status('200').json({
                        message: 'not found comment',
                        data: null,
                        success: false
                    })
                }
                else {
                    console.log('list sub cmt: '+result.list_Comment);
                    return res.status('200').json({
                        message: 'List comment and subComment',
                        data: result.list_Comment,
                        success: true
                    })

                }
            }
        })
}

module.exports = {
    createComment: createComment,
    getPlaceComments: getPlaceComments,
    getListSubCmt: getListSubCmt,

}