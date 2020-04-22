const mongoose = require ('mongoose');
const crypto = require('crypto');
const User = new mongoose.Schema({
    
    local:{
        salt: String,
        email:{
            type: String,
            trim: true,
            unique: 'email is already exits',
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
            sparse:true
           
        },
        hash_password:{
            type: String
        }
        
    },
    google:{
        email:{
            type:String,
            trim:true,
            sparse:true
        }
    },
    facebook:{
        id:{
            type:String,
            trim:true
        },
        email:{

            type:String,
            trim:true,
            sparse:true
        }
    },
    fistname:{
        type: String,
        trim: true
       
    },
    lastname:{
        type: String,
        trim: true
       
    },
    tel:{
        type:String,
        trim: true
    },
    id_place:{
        type: String,
        trim: true
    },
    deleted:{
        type: Boolean,
        default: false
    },
    picture:{
        type: String,
        require: false
    }
});
User
 .virtual('local.password')
 .set(function(password){
     this.local._password = password;
     this.local.salt = this.makeSalt();
     this.local.hash_password = this.encrypassword(password);
 })
 .get(function(){
     return this.local._password;
 });

 User.path('local.hash_password').validate(function(v) {
    if (this.local._password && this.local._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this.local._password) {
      this.invalidate('password', 'Password is required')
    }
  }, null);

User.methods =  {
    encrypassword:  function(password){
        if(!password){
            return '';
        }
        try{
            return crypto
            .createHmac('sha1',this.local.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return '';
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
      },
    authanticate: function(plaitext){
            return this.encrypassword(plaitext)=== this.local.hash_password;
      }
};
module.exports = mongoose.model('User',User);