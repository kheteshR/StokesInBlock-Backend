'use strict'

const admitModel = require('../models/admitCard');

exports.getAdmitDetails = (HallCenter,Seat_Number,status,uniqid,candiName, ResidentialAddr,motherName,RollNo, fatherName, dob, schoolCode,AdharNo, schoolName,userId,TypeOform,MobNo,InstitueStatus,DivisionalStatus,txHash) =>

new Promise((resolve, reject) => {

   const newAdmit = new admitModel({
         uniqid:uniqid,
         TypeOform:TypeOform,
         AdharNo:AdharNo,
         MobNo:MobNo,
         RollNo:RollNo,
         candiName:candiName,
         motherName:motherName,
         fatherName:fatherName,
         dob:dob,
         schoolCode:schoolCode,
         schoolName:schoolName,
         userId:userId,
         ResidentialAddr:ResidentialAddr,
         status:status,
         HallCenter:HallCenter,
         Seat_Number:Seat_Number,
         InstitueStatus:InstitueStatus,
         DivisionalStatus:DivisionalStatus,
         ApplicationStatus:status,
         created_At:new Date()
          
         
   });
   console.log("new admit card details", newAdmit);

   newAdmit.save()
   .then((data) => resolve({
       status: 201,
       message: "admit card details stored succesfully",
       data:data
   }))
   .catch(err => {
      return "500"
   })



});