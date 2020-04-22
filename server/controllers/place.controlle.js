const Place = require('../models/place.model');
const Address = require('../models/address.model');
const formidable = require('formidable');
const User = require('../models/User.model');

const createPlace = (req, res, next) => {

    var form = new formidable.IncomingForm();

    form.uploadDir = "./pics/";
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        const newPlace = new Place(fields)
        var listImage = files.listPics;

        if (listImage) {
        var listPathImage = [];
        if (Array.isArray(listImage)) {
            listImage.forEach(element => {
            listPathImage.push('/pics/'+element.path.toString().slice(5));
            });
        }
        else {
            listPathImage.push('/pics/'+listImage.path.toString().slice(5));
        }
        newPlace.picture = listPathImage;
        }
        newPlace.save((error) => {
            if (error) {
                res.status('200').json({
                    data: null,
                    message: "Không cập nhật được!",
                    success: false
                });
            }
            else {
                res.status('200').json({
                    data: {
                        picture: newPlace.picture
                    },
                    message: 'Đăng địa điểm thành công!',
                    success: true
                });
            }
        });
        
    });
}
const editPlace = (req, res, next) => {
    const id_Places = req.params.id_place;
    // console.log("id_Place: " + id_Places);

    var id_user = req.decoded._id;

    var form = new formidable.IncomingForm();
    form.uploadDir = "./pics/";
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        // ...
        // console.log(fields);
        const newPlace = fields;

        newPlace.createBy = id_user;
        var listImage = files.listPics;
        // console.log(listImage);
        if (listImage) {
            var listPathImage = [];
            if (Array.isArray(listImage)) {
                listImage.forEach(element => {
                listPathImage.push('/pics/'+element.path.toString().slice(5));
                });
            }
            else {
                listPathImage.push('/pics/'+listImage.path.toString().slice(5));
            }
            newPlace.picture = listPathImage;
        }
        console.log(newPlace);

        Place.update({'_id': id_Places, deleted: false}, newPlace)
            .exec((err,result) =>{
                if (err) {
                    res.status('200').json({
                        data: {

                        },
                        message: "Không cập nhật được!",
                        success: false
                    });
                }
                else {
                    res.status('200').json({
                        data: {
                            picture: newPlace.picture
                        },
                        message: 'Cập nhật thành công!',
                        success: true
                    });
                }
            })
        
    });
}
const getAllPlace = (req, res) => {
    var temp = req.query;
    //console.log(req.query)
    const pageNumber = req.params.page;
    var search ={};
    if(temp.id_type_place!='default'){
        search.id_type_place = temp.id_type_place;
    }
    if(temp.city!='default'){
        search.city = temp.city;
    }
    if(temp.dictrict!='default'){
        search.dictrict= temp.dictrict;
    }

    search.deleted= false;
    //console.log(search, pageNumber)

    Place.find(search)
        // .select('_id name_place phone stress dictrict city picture')
        .limit(10)
        .skip(10*(pageNumber - 1))
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

const getPlaceTotal = (req,res)=>{
    Place.countDocuments({deleted:false},(err,count)=>{
        if(err){
            return res.status('400').json({
                message:'khong lay duoc',
                success:false,
                data:null
            })
        }
        else{
            return res.status('200').json({
                data:count,
                success:true,
                message: 'lay thanh cong'
            })
        }
    });
    
}
const getUserPlaces = (req, res) => {

    var idUser = req.decoded._id;
    // console.log("a"+idUser);
    Place.find({deleted:false, createBy: idUser})
        // .populate('id_User', '')
        // .select('_id name_place phone stress dictrict city picture')
        .exec((err, result) => {
            //console.log("aaa"+result);
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

const getDetailPlaces = (req, res) => {
    var idPlace = req.params.id_Place;

    Place.find({_id : idPlace, deleted:false})
        .populate('createBy', 'fistname lastname tel picture')
        .exec((err, result)=>{
            if (err) {
                return res.status('200').json({
                    message : "Không lấy được dữ liệu",
                    success: false
                });
            }
            else{
                // console.log("aaa"+result);
                return res.status('200').json({
                    data: result,
                    message : "thành công",
                    success: true
                    
                });
                
            }
        })
}

const deletePlace = (req, res, next) => {
    
    if (req.params.id_place !== null) {
        const id_user = req.decoded._id;
        Place.find({ _id: req.params.id_place, id_User: id_user,deleted:false })
            .exec((err, result) => {
                // console.log(result)
                if (err) {
                    return res.status('400').json(err);
                }
                else {
                    if (result) {
                        Place.findByIdAndUpdate({ _id: req.params.id_place},{deleted:true})
                            .exec((err, result) => {
                                if (err) {
                                    return res.status('400').json(err);
                                }
                                else {
                                    next();
                                }
                            })
                    }
                    else{
                        return res.status('204').json({message:"this User not permission"});
                    }
                }
            });
    }
    else {
        return res.status('200').json({ message: "not find id_address" });
    }
}
const find_id_place = (req, res, next )=> {
   
        Address.findById(req.params.id_address)
            .select('id_place')
            .exec((err, result) => {
                if (result) {
                    req.body.id_place = result.id_place;
                    next();
                }
                else {
                    return res.status('200').json({message:"id_address is incorrect"});
                }
            });

}

const getAllPlaces_ad=(req,res)=>{
    Place.find({deleted:false})
        .populate('createBy', 'fistname lastname tel picture')
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
const getDeletedPlaces=(req,res)=>{
    Place.find({deleted:true})
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

const deletePlaces_ad=(req,res)=>{
    const id = req.params.id;
    console.log(id)
    Place.findByIdAndUpdate(id,{deleted: true})
        .exec((err,result)=>{
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

const getNewestPlace=(req,res)=>{
    Place.find({deleted:false})
    // .select('_id name_place phone stress dictrict city picture')
    .limit(5)
    .sort({$natural:-1})
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
    createPlace: createPlace,
    editPlace: editPlace,
    getAllPlace: getAllPlace,
    getUserPlaces: getUserPlaces,
    deletePlace: deletePlace,
    find_id_place:find_id_place,
    getDetailPlaces:getDetailPlaces,
    getPlaceTotal:getPlaceTotal,
    getAllPlaces_ad:getAllPlaces_ad,
    getDeletedPlaces:getDeletedPlaces,
    deletePlaces_ad:deletePlaces_ad,
    getNewestPlace:getNewestPlace,
}