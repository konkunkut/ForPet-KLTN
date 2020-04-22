const News = require('../models/news.model');
const datetime = require('date-time');
const formidable = require('formidable');

const createNews = (req, res, next) => {
    var id = req.decoded._id;
    //////////////////////////////////////////////
    var form = new formidable.IncomingForm();
    form.uploadDir = "./pics/";
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        // ...
        // console.log(fields);
        const news = new News(fields);

        var listImage = files.listPics;
        // console.log(listImage);
        if (listImage) {
            var listPathImage = [];
            if (Array.isArray(listImage)) {
                listImage.forEach(element => {
                    listPathImage.push('/pics/' + element.path.toString().slice(5));
                });
            }
            else {
                listPathImage.push('/pics/' + listImage.path.toString().slice(5));
            }
            news.pictures = listPathImage;
        }
        news.save((error) => {
            if (error) {
                return res.status('200').json({
                    data: null,
                    message: "Không cập nhật được!",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data: {
                        picture: news.picture
                    },
                    message: 'Đăng bài viết thành công!',
                    success: true
                });
            }
        });
    });
}
const getNewsId = (req, res) => {
    const newsId = req.params.newsId;
    //console.log(req.query.newsId);
    News.find({_id:newsId,deleted: false})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .exec((err, result)=> {
            if (err) {
                return res.status('200').json({
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
            else{
                if(!result){
                    return res.status('200').json({
                        data: null,
                        message : "khong co du lieu",
                        success: false
                        
                    });
                }
                else{

                    return res.status('200').json({
                        data: result,
                        message : "thành công",
                        success: true
                        
                    });
                }
                // console.log("aaa"+result);
                
            }
        })
}
const getNewsTagsAll = (req, res) => {
    let typeTags = req.params.tags;
    News.find(typeTags, (err, listnews) => {
        //console.log(listnews);
        if (err) {
            return res.status('401').json(err);
        }
        if (!listnews) {
            return res.status('400').json({ massage: 'not found' });
        }
        else {
            return res.status('200').json(listnews);
        }
    })
}
const getNewsAll = (req, res) => {
    const p = req.params.page;
    News.find({deleted:false})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .limit(10)
        .sort({ date: -1 })
        .skip(10 * (p - 1))
        .exec((err, arrayNews) => {
            //console.log(arrayNews);
            if (err) {
                return res.status('200').json({
                    message: "Không lấy được dữ liệu",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data: arrayNews,
                    message:"Thành công",
                    success: true
                });
            }
        })
}
const editNews = (req, res) => {
    News.updateOne({ _id: req.params.idNews, id_user: req.decoded._id, deleted:false}, req.body, (err, result) => {
        console.log(req.decoded._id)
        console.log(req.params.idNews)
        console.log(req.body);

        if (err) {
            res.status('400').json(err);
        }
        else {
            if (result) {
                res.status('200').json({ message: 'edited success!' });
            }
            else {
                res.status('200').json({ message: 'edit unsuccessful!' });
            }
        }
    })
}
const removeNews = (req, res) => {
    let id_News = req.params.idNews;
    let id_User = req.decoded._id;
    News.findOneAndDelete({ _id: id_News, id_user: id_User }, (err, result) => {
        console.log('son dep tria 1998');

        if (err) {

            return res.status('401').json(err);
        }
        if (result) {
            return res.status('200').json({ massage: 'success' });
        }
        else {
            console.log(result)
            return res.status('400').json({ massage: 'id not found' });
        }
    });

}
const getNewsLimit = (req, res) => {
    //const p = req.params.page;
    News.find({deleted:false})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .limit(3)
        .sort({ date: -1 })
        //.skip(3 * (p - 1))
        .exec((err, result) => {
            if (err) {
                return res.status('200').json({
                    message: "Không lấy được dữ liệu",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data: result,
                    message:"Thành công",
                    success: true
                });
            }
        });

}
const getNewNews = (req, res) => {
    News.find({deleted:false})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .limit(5)
        .sort({ date: -1 })
        //.skip(0)
        .exec((err, result) => {
            if (err) {
                return res.status('200').json({
                    message: "Không lấy được dữ liệu",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data: result,
                    message:"Thành công",
                    success: true
                });
            }
        });
}
const getNewsTotal = (req, res) => {
    News.countDocuments({deleted:false},(err, count) => {
        if (err) {
            return res.status('400').json({
                data: null,
                message: 'khong lay duoc',
                success: false
            })
        }
        else {
            return res.status('200').json({
                message: 'lay thanh cong',
                success: true,
                data: count
            })
        }
    })
}
const upDateView = (req, res) => {
    //req.body={id_place,rate}

    News.findByIdAndUpdate(req.params.newsId, {$inc :{ view: 1 }})
        .exec((err, rate) => {
            if (err) {
                return res.status('400').json(err);
            }
            else return res.status('200').json({ 
                message: 'updated reate success' 
            });
        })
}
const getUserBlogs =(req,res)=>{
    var idUser = req.decoded._id;
    // console.log("a"+idUser);
    News.find({id_user: idUser,deleted:false})
        // .populate('id_User', '')
        // .select('_id name_place phone stress dictrict city picture')
        .exec((err, result) => {
            // console.log("aaa"+result);
            if (err) {
                return res.status('200').json({
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
            else {
                return res.status('200').json({
                    data : result,
                    message: "thành công!",
                    success: true
                });
            }
        })
}

const deleteNews = (req,res)=>{
    const id = req.params.id;
    console.log(id)
    News.findByIdAndUpdate(id,{deleted: true},(err,result)=>{
        if(err){
            return res.status('400').json(err);
        }
        else{
            if(result){
                return res.status('200').json({
                    success: true,
                    message: 'deleted successful'
                })
            }
            else
            {
                return res.status('200').json({
                    success: false,
                    message: 'xoa khong thanh cong!'
                })
            }
        }
    })
}

const getAllNews_ad=(req,res)=>{
    News.find({deleted:false})
        .populate('id_user', 'fistname lastname')
        .exec((err, result) => {
            if (err) {
                return res.status('200').json({
                    message: "Không lấy được dữ liệu",
                    success: false
                });

            }
            else {
                return res.status('200').json({
                    data: result,
                    message:"Thành công",
                    success: true
                });
            }
        })
}



module.exports = {
    createNews: createNews,
    getNewsId: getNewsId,
    getNewsTagsAll: getNewsTagsAll,
    getNewsAll: getNewsAll,
    removeNews: removeNews,
    editNews: editNews,
    getNewsLimit: getNewsLimit,
    getNewNews: getNewNews,
    getNewsTotal: getNewsTotal,
    upDateView: upDateView,
    getUserBlogs: getUserBlogs,
    deleteNews:deleteNews,
    getAllNews_ad: getAllNews_ad,

}