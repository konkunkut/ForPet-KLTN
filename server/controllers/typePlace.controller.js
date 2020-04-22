const TypePlace = require('../models/typePlace.model');

const createTypePlace = (req,res)=>{
    const type_place = new TypePlace(req.body);
    console.log(req.body);
    type_place.save((err,result)=>{
        console.log(result)
        if(err){
            return res.status('404').json(err);
        }
        else{
            return res.status('200').json({message:'created TypePlace success'});
        }
    });
    
}

const getTypePlace = (req,res)=>{
    const id = req.params.id_type_place;
    TypePlace.findById(id).
    exec((err,result)=>{
        if (err){
            return res.status('404').json(err);
        }
        else{
            return res.status('200').json(result);
        }
    });
}
const editTypePlace = (req,res)=>{

    var id = req.params.id_type_place;
    //console.log(req.body.type_place);
    
    TypePlace.updateOne({_id:id},req.body,)
            .exec((err,result)=>{
              
                if(err){
                    return res.status('404').json(err);
                }
                else {
                    return res.status('200').json({message:'edited success'});
                }
            });
 }
module.exports={
    editTypePlace:editTypePlace,
    getTypePlace:getTypePlace,
    createTypePlace:createTypePlace
}