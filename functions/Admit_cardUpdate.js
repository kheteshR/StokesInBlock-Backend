'use strict';
const nem = require("nem-sdk").default;
const uploads = require("../models/uploaded")
const users = require("../models/account")
const Requests = require('../models/request')

const crypto=require('crypto')
const identity = require('../models/Identity');
var AddressOfProvider;
var privatekey;


exports.HallTicketUpdate=(status,_id,message,NoOfToken)=>{

    return new Promise(async(resolve,reject)=>{
        console.log(status,_id,message,NoOfToken)
        var report=await Requests.find({ _id:_id});
        var result123;
        
            console.log("please check report output===",report);
            var str=JSON.stringify(report);
            console.log("str=======>",str)
            var userId=report[0]._doc.userId;
            var id=report[0]._doc.id;
            
            var RequesterAddress=report[0]._doc.RequesterAddress;
            var Requester=report[0]._doc.Requester;
            var RxAddress=report[0]._doc.RxAddress;
            var RequesterDigitalIdentity=report[0].RequesterDigitalIdentity;
          
            const rapidID = crypto.createHash('sha256').update(str).digest('base64');
            console.log("repidID...........",rapidID)
            
            var transferObj={
                "id":id,
                "status":status,
                "userId":userId,
                "RequesterAddress":RequesterAddress,
                "Requester":Requester,
                "RxAddress":RxAddress,
                "RequesterDigitalIdentity":RequesterDigitalIdentity,
                "rapidID":rapidID,
                "created_At":new Date(),
                "message":message,
                
             }
                var str=JSON.stringify(transferObj)
                var endpoint =nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");    
                
                // Create a common object holding key
                var common = nem.model.objects.create("common")("123","5d4c2cc0cf10544e6d746809a7482e0bd5188f40f61140527a7cf806b3fc01c3");
                
                // Create an un-prepared transfer transaction objecpatientst
                var transferTransaction = nem.model.objects.create("transferTransaction")("MAF724EFGGIEVPUBHSMFNRVMVBKVNMETLKWTAFV4", 0,str);//divisional board will send status to Institution
                
                // Prepare the transfer transaction object
                var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
                
                //Serialize transfer transaction and announce
                var hee=await (nem.model.transactions.send(common, transactionEntity, endpoint))
                console.log("heeeeeeeeeeeeeeeeee================>",hee.transactionHash.data)
                console.log("transcation not done========>",_id,status)
                result123 =await (Requests.findOneAndUpdate({ _id:_id }, { $set: { "status":status,"message":message,"transactionHash":hee.transactionHash.data,"NoOfToken":NoOfToken, "created_At":new Date()},$push:{"previousHashes":hee.transactionHash.data}},{new: true}))
            
                console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhh================>",result123)
                return  resolve({
                "result":result123
                })
                })
             .catch(err=>{console.log(err)})
            }
