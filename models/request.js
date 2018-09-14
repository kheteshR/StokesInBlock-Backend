'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = mongoose.Schema({
    userId:String,
    status:String,
    Requester:String,
    SpendingAmount:String,
    NoOfToken:String,
    RxAddress:String,
    NumberOfToken:String,
    transactionHash:String,
    RequesterAddress:String,
    RequesterDigitalIdentity:String,
    message:String,
    previousHashes:Array,
    created_at: String
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://Chanchal:a123456@ds237832.mlab.com:37832/info', { useMongoClient: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })
module.exports = mongoose.model('RequestModel', RequestSchema);