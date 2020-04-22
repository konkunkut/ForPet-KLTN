const Rate = require('../models/rate.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createRate = (req, res) => {
    //req.body={ id_place,rate}
    req.body.id_user = req.decoded._id;
    const rate = new Rate(req.body);
    rate.save((err, rte) => {
        if (err) {
            return res.status('400').json(err);
        }
        if (rte) {
            return res.status('200').json({
                message: 'created Rate success',
                success: true 
            });

        }
        else {
            return res.status('200').json({ 
                message: 'not created rate', 
                success: false 
            });
        }
    })
}

const upDateRate = (req, res) => {
    //req.body={id_place,rate}

    Rate.findOneAndUpdate({ id_place: req.body.id_place, id_user: req.decoded._id }, { rate: req.body.rate }, (err, rate) => {
        if (err) {
            return res.status('400').json(err);
        }
        else return res.status('200').json({ 
            message: 'updated reate success' 
        });
    })


}

const getRateUser = (req, res) => {
    const id_place = req.params.id_place;
    const id_user = req.decoded._id;
    // console.log('aa'+id_place, id_user);
    const rate = [{
        $match: { id_place: ObjectId(id_place.toString()), id_user: ObjectId(id_user.toString()) }
    },{
        $project:{ 
            'rate':1
        }
    }
    ]
    Rate.aggregate(rate).exec((err, result) => {
        if (err) {
            // console.log(err);
            return res.status('400').json(err);
        }
        else {
            if (!result) {
                return res.status('200').json({
                    message: "User not yet rated",
                    data: null,
                    success: false
                })
            }
            else {
                // console.log("aa"+result);
                return res.status('200').json({
                    message: "get rated",
                    data: result,
                    success: true
                })
            }
        }
    })
}

const getRatePlace = (req, res) => {
    //req.body = {id_place}
    const id_pl = req.params.id_place;
    const aggregatorRate = [{
        $match: { id_place: ObjectId(id_pl.toString()) }
    },
    {
        $group: {
            _id: { rate: "$rate", id_place: "$id_place" },
            count: { $sum: 1 }
        }
    }]
    Rate.aggregate(aggregatorRate).exec((err, result) => {
        if (err) {
            console.log(err);
            return res.status('400').json(err);
        }
        else {
            //console.log(result);
            if (!result) {
                return res.status('200').json({
                    message: "Place has no rate yet",
                    success: false,
                    data: null
                });
            }
            else {
                return res.status('200').json({
                    message: "get rate place",
                    data: result,
                    success: true
                });
            }
        }
    });
}
module.exports = {
    createRate: createRate,
    upDateRate: upDateRate,
    getRatePlace: getRatePlace,
    getRateUser: getRateUser
}