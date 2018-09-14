'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UploadDocumentSchema = mongoose.Schema({
    filesHash:Object,
    DownloadedfileHash:Array,
    PullTxHash:Array,
    DocumentType:String,
    name:String,
    userId:Number,
    message:String,
    CreatedBy:String,
    SeatNumber:String,
    status:String,
    Downloaded:Array,
    usertype:String,  
    txHash:String, 
    UserfileHash:Object,
    previousHashes:Array,
    NewfileHash:Array,    
    created_at: Date   
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true }).then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('StatusUpload', UploadDocumentSchema);