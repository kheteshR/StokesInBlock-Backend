'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UploadDocumentSchema = mongoose.Schema({
    filesHash:Object,
    DocumentType:String,
    name:String,
    userId:Number,
    message:String,
    SeatNumber:String,
    status:String,
    usertype:String,  
    txHash:String, 
    previousHashes:Array,
    NewfileHash:Object,    
    created_at: Date    
});


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true });

module.exports = mongoose.model('UserRequest', UploadDocumentSchema);