const subComment = require('../models/subComment.model')
const auth = require('../Authen/login.authen');
const comment = require('../models/comment.model')


const createSubComment = (req, res) => {
    const sub = new subComment({
        id_User_subComment: req.decoded._id,
        content: req.body.content

    })
    sub.save((err, result) => {
        if (err) {
            return res.status('400').json(err);
        }
        else {
            if (!result) {
                return res.status('200').json({
                    message: 'create subComment failed',
                    data: null,
                    success: false
                })
            }
            else {
                comment.findByIdAndUpdate(req.body.id_comment,{$push:{list_Comment:result._id}})
                .exec((err,resultComment)=>{
                    if(err){
                        return res.status('200').json({
                            message: 'create subComment failed',
                            data: null,
                            success: false
                        })
                    }

                })
                return res.status('200').json({
                    message: 'created subComment successfully',
                    data:result,
                    success: true
                })
            }
        }
    })
}


const getSubcommentList = (req, res, next) => {

    req.comments.forEach(element => {

        subComment.find({ 'id_comment': element._id })
            .exec((err, result) => {

                if (err) {
                    return false;
                }
                else {
                    //console.log(result)
                    arraySubcomments.push(result);

                }
            })

    });
    next();


    //await getSubComment('ada');

}



const consolea = (req, res) => {
    console.log(arraySubcomments);

}
module.exports = {
    createSubComment: createSubComment,
    getSubcommentList: getSubcommentList,
    console: consolea
}