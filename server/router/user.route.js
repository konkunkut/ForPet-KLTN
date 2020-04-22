const express = require('express');
const route = express.Router();
const usercontroller = require('../controllers/user.controller');
const login = require('../Authen/login.authen');
passport =  require('passport');
const passportSetup =  require('../configs/passport-setup.config');

// var cors = require('cors');
// var corsOptions = {
//     origin: 'http://localhost:3000/user/authGoogle',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
//     // credentials:true
//     allowedHeaders: ["Content-Type", "Authorization"],
//     method: this.get,
//   }, cors(corsOptions)

route.post('/singup',usercontroller.signup);
route.post('/singin',login.signin);
route.post('/signGoogle',login.signGoogle);

route.get('/authGoogle', passport.authenticate('google',{
    scope:['profile', 'email']
}));
route.get('/Home',passport.authenticate('google'),login.callback);
route.get('/ViewProfile',login.checkOauthToken,usercontroller.Viewprofile);
route.get('/authFacebook', passport.authenticate('facebook',{scope:'email'}));
route.get('/HomeFace',  passport.authenticate('facebook'),login.callback);
route.put('/editUserProfile',login.checkOauthToken,usercontroller.editProfile);
route.put('/updateAvatar',login.checkOauthToken,usercontroller.updateAvatar);
route.get('/ViewAvatar',login.checkOauthToken,usercontroller.ViewAvatar);
route.get('/getNamePic/:id_user',usercontroller.getNamePic);
route.delete('/deleteUser/:id',login.checkOauthToken,usercontroller.deleteUser);
route.get('/getAllUser_ad',usercontroller.getAllUser_ad);
route.get('/getDeletedUser',usercontroller.getDeletedUser);

module.exports=route;