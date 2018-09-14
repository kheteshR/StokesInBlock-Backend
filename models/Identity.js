'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

   firstname : String,
   lastname : String,
   usertype: String,
   age: String,
   aadhar:String,
   pan:String,
   address:String,
   emailid:String,
   rapidID:String,
   status:String,
   DigitalIdentity:String,
   userId:String,
   status:String,
   balance:String

});


mongoose.Promise = global.Promise;
// mongodb://<dbuser>:<dbpassword>@ds237832.mlab.com:37832/info
mongoose.connect('mongodb://Chanchal:a123456@ds237832.mlab.com:37832/info', { useMongoClient: true }).then(
   ()=>{
     console.log("connected to mongoDB")},
  (err)=>{
      console.log("err",err);
  })

module.exports = mongoose.model('userIdentity', userSchema);