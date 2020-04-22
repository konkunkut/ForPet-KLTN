const token = require('jsonwebtoken');
const passport = require('passport');
const googleStrategy =  require('passport-google-oauth20');
const facebookStrategy = require('passport-facebook');
const {Aclclass}= require('../helper/acl_store.heiper');

passport.serializeUser(function(user, done) {
    done(null, user);
});

const config = require('./config');
const key = require('./key.config');
const User = require('../models/User.model');

//google
passport.use(

    // res.header("Access-Control-Allow-Origin", "http://localhost");
    // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // //Auth Each API Request created by user.
    // next();

    new googleStrategy({
        clientID:key.google.clientID,
        clientSecret:key.google.clientSecret,
        callbackURL:'/Home'

    },( accessToken, refreshToken, profile,  done) =>{
      //  console.log(profile);
        
       User.findOne({'google.email':profile._json.email},(err,user)=>{
           //console.log(profile._json.picture)
           
            if(!user){
                user = new User({
                        google:{
                            email: profile._json.email,
                            // picture: profile._json.picture
                        },
                        fistname: profile._json.family_name,
                        lastname: profile._json.given_name,
                        picture: profile._json.picture
                });
        
               // console.log(user);
                user.save((err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        const acl = Aclclass.getAcl;
                        acl.addUserRoles(result._id.toString(),'user',(err)=>{
                            if(err){
                                console.log(err);
                            }

                        })
                    }
                });    
              
            }    
            //console.log(user);
            done(null,user); 
       });
    }
    )
)

//facebook
passport.use(
    new facebookStrategy (
        {
            
            clientID:key.facebook.clientID,
            clientSecret:key.facebook.clientSecret,
            callbackURL:'/HomeFace',
            profileFields: ['id', 'displayName', 'email','photos','name']
        }, (accessToken, refreshToken,profile,done)=>{
            console.log(profile);
            User.findOne({'facebook.email':profile._json.email},(err,user)=>{

                //console.log(profile._json.bio);
              if(err||!user){
                    user = new User({
                        facebook:{
                            emai:profile._json.email,
                            fullName:profile.displayName,
                            id:profile._json.id,
                        },
                        lastname:profile._json.last_name,
                        fistname:profile._json.middle_name +' '+profile._json.first_name

                    });
                   // console.log(user);
                    user.save((err,result)=>{
                        if(err){
                            console.log(err)
                        }
                        else{
                            const acl1 = Aclclass.getAcl;
                            acl1.addUserRoles(result._id.toString(),'user',(err)=>{
                                if(err){
                                    console.log(err);
                                }

                            })
                        }
                    });
                }
                done(null,user);
             });
        }
    )
);