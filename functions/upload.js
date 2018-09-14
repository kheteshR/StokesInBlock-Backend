'use strict';
const nem = require("nem-sdk").default;
const upload=require("../models/uploaded")
const crypto= require("crypto");
var AddressProvider1="MDP35Y52MYNOHRGFGRYJW4YNKGRZHZLR3G3WQKDC"
var AddressProvider2="MAT4QUUKC2SJMOZ35UQKL4YS6RAOCRWW7VFDY4MP"


exports.UploadDocuments = (filesHash,documentType,SeatNumber,name,usertype,status,CreatedBy) =>

    new Promise(async(resolve, reject) => {
       
        var endpoint =nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");    
        // Create a common object holding key
        var common = nem.model.objects.create("common")("123","a6eb271bac6b5a533bfcc8523808c221c5fd4d854dee5623e41a55c8839882a3");
       
        // Create an un-prepared transfer transaction object
        var Transfer={
        "ContentHash":filesHash[0].hash,
        "Document":documentType,
        "name":name,
        "SeatNumber":SeatNumber,
        "CreatedBy":CreatedBy,
         created_at: new Date()
        }
        var TransferObject=JSON.stringify(Transfer)
        var transferTransaction = nem.model.objects.create("transferTransaction")(AddressProvider2, 0,TransferObject );
        // Prepare the transfer transaction object
        var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
        
        //Serialize transfer transaction and announce
        var ee= await nem.model.transactions.send(common, transactionEntity, endpoint)
        console.log(ee.transactionHash.data)
       
        
        console.log("name===========",name)
        const Documents = new upload({
           filesHash:filesHash,
           DocumentType:documentType,
           name:name,
           status:status,
           SeatNumber:SeatNumber,
           usertype:usertype,
           txHash:ee.transactionHash.data,
           CreatedBy:CreatedBy,
           created_at: new Date(),
           });
        console.log("Document========>>>>>",Documents)
        Documents.save()
            .then(() => resolve({
                status: 200,
                usertype:usertype,
                message: "saved hash success",
                Documents:Documents,
                name:name
              
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
            });
    });
    