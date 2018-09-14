'use strict';
const nem = require("nem-sdk").default;
const Requests=require('../models/request')
const users = require("../models/account")



exports.Request=(RecieverAccount,SenderName,request,status)=>

        new Promise(async(resolve, reject) => {
            console.log("RecieverAccount=====================>>>>>",RecieverAccount)
            console.log("SenderName=====================>>>>>",SenderName)
           const UserAccount = await users.find({
                "walletName": SenderName
            })
            var RequesterAddress= UserAccount[0].Address;
            console.log("RequesterAddress=====================>>>>>",RequesterAddress)
            const RecipientAccount = await users.find({
                "Address": RecieverAccount
            })
          
            var userId=RecipientAccount[0].userId;
            console.log("userid check======>>",userId)
            const RequestModel = new Requests({
            RecieverAccount:RecieverAccount,
            SenderAddress:RequesterAddress,
            SenderName:SenderName,
            DocumentType:request,
            status:status,
            RecipientuserId:userId,
            created_at: new Date(),
            });
         console.log("RequestModel========>>>>>",RequestModel)
         RequestModel.save()
         .then(() => resolve({
             status: 200,
             message: "Request sent successfully",
           
         }))

         .catch(err => {

             if (err.code == 11000) {

                 reject({
                     status: 409,
                     message: ' Already uploaded !'
                 });

             } else {

                 reject({
                     status: 500,
                     message: 'upload !'
                 });
             }

        })
    })