'use strict';
const nem = require("nem-sdk").default;
var UserRequests=require('../models/uploaded')


exports.Request=(Id,userId,name,SeatNo,ContentHash,documentType,usertype,message,status)=>
    {
return new Promise((resolve,reject)=>{

    UserRequests.find({ _id:Id}).then(result=>{
console.log("current user object==========>>>>",Id)
        var report = result
        var name=report[0]._doc.name

       
//         var transferObj={"id":id,
//             "rapidID":rapidID,
//             "submitID":submitID,
//             "message":message,
//             "status":status
// }
    // var str=JSON.stringify(transferObj)
   
        if(status == "Request Initiated by user"){
            new Promise(async(resolve,reject)=>{
             var result =await (UserRequests.findOneAndUpdate({ _id:Id }, { $set: { "status":status,"message":message,"created_at":new Date},$push:{"UserfileHash":ContentHash}},{new: true}))
              console.log("yes================>",result)
              return  resolve({"status":200,
                "message":"rejected"})  
        
            })
            }
      
            
            return  resolve({"status":200,
            "messsage":"object updated"})

            }).catch(err=>{console.log(err)})
        })
    }
