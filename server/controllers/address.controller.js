const Address = require('../models/address.model');
const createAddress =  (req,res)=>{
    const address = new Address(req.body);
    address.save((err,result)=>{
        if(err){
            return res.status('400').json(err);
        }
        else{
            return res.status('200').json({message:"created success address"});
        }
    })
}
const editAddress = (req,res)=>{
    Address.updateOne({_id:req.params.id_address},req.body,(err,result)=>{
        if(err){
            return res.status('400').json(err);
        }
        else{
            return res.status('200').json({massage:'edited address success'});
        }
    })
}
const deleteAddress = (req,res)=>{
    const id= req.params.id_address;
    Address.findByIdAndDelete(id,(err,result)=>{
        if(err){
            return res.status('400').json(err);
        }
        if(result){
            return res.status('200').json({message:"deleted Address success"});
        }
        else{
            return res.status('204').json({message:"deleted Address unsuccessful"});
        }
    });
}
module.exports = {
    createAddress:createAddress,
    editAddress:editAddress,
    deleteAddress:deleteAddress
}