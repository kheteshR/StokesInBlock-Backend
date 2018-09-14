'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({ 
    nem_id : Object,
    privateKey : String,
    walletName : String,
    password : String,
    usertype: String,
    Address:String,
    userId:String,
    phonetosend:String,
    created_at: String    
});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Chanchal:a123456@ds237832.mlab.com:37832/info', { useMongoClient: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('user', userSchema);