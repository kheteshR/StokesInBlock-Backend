'use strict';
const nem = require("nem-sdk").default;
const uploads=require("../models/uploaded");
const admitModel = require('../models/admitCard');


exports.SignDuplicateMarksheet = (userId,name,TotalMarks,Session,propertyType,DuplicateRequestStatus)=>{
    
    return new Promise(async(resolve,reject)=>{
    const results= await  uploads.find({ "userId":userId});
    console.log("output fetch==========>>",results)
    admitModel.findOneAndUpdate( { $and: [{"userId":userId},{"TypeOform":propertyType}] } ,{
        $set: {
            "TotalMarks":TotalMarks,
            "Session":Session,
            "DuplicateRequestStatus":DuplicateRequestStatus,
            "Request_At":new Date()
        }
    },{
        new: true
    }).then(function (result) {
        console.log("check your result====>>",result)
            return resolve({
                result:result
            })
        })

})
}