'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const admitSchema = mongoose.Schema({
         message:String,
         TypeOform:String,
         AdharNo:String,
         MobNo:String,
         RollNo:String,
         candiName: String,
         motherName: String,
         fatherName: String,
         dob: String,
         schoolCode: String,
         schoolName: String,
         userId:String,
         ResidentialAddr:String,
         uniqid:String,
         status:String,
         InstitueStatus:String,
         DivisionalStatus:String,
         ApplicationStatus:String,
         HallCenter:String,
         Seat_Number:String,
         crypto:String,
         txHash:String,
         previousHashes:Array,
         TotalMarks:String,
         Session:String,
         Request_At:String,
         DuplicateRequestStatus:String,
         created_At:String
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://risabhsharma71:Rpqb123@ds111420.mlab.com:11420/care4u', { useMongoClient: true })
.then(
    ()=>{
      console.log("connected to mongoDB")},
   (err)=>{
       console.log("err",err);
   })

module.exports = mongoose.model('admitModel', admitSchema);