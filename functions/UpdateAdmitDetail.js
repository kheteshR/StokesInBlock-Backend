'use strict';
const admitModel = require('../models/admitCard');
const crypto= require("crypto");
var nem = require("nem-sdk").default;
exports.UpdateAdmitCard = (id,TypeOform, userId,candiName,motherName, fatherName, dob, MobNo,RollNo, AdharNo,schoolCode,schoolName) => {

    console.log("userId=======", userId, id);
    return new Promise(async (resolve, reject) => {
        
        const output = await admitModel.find({
            _id: id
        });
        var str=JSON.stringify(output);
        console.log("str=======>",str)
        console.log("output====", output);
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
        const rapidID = crypto.createHash('sha256').update(str).digest('base64');
        console.log("repidID...........",rapidID)
        var NemObj = {
            "id": id,
            "TypeOform": TypeOform,
            "userId": userId,
            "candiName": candiName,
            "schoolName": schoolName,
            "AdharNo": AdharNo,
            "dob": dob,
            "rapidID":rapidID,
            "Initiater":"Institute",
            "created_At":new Date(),
            "message":"validated data by Institute",
            "status":"Re-processed data by Institute"
        }
        var str = JSON.stringify(NemObj);
        console.log(str)
        // Create a common object holding key
        var common = nem.model.objects.create("common")("123", "dc1505c6b93d3cea132270294abbb9b1465ef2209853c385b31c65da3ac3bb75");
        // Create an un-prepared transfer transaction objecpatientst
        var transferTransaction = nem.model.objects.create("transferTransaction")("MAT4QUUKC2SJMOZ35UQKL4YS6RAOCRWW7VFDY4MP", 0, str); //divisional board will send status to Institution
        // Prepare the transfer transaction object
        var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
        //Serialize transfer transaction and announce
        var hee = await nem.model.transactions.send(common, transactionEntity, endpoint)
        console.log("heeeeeeeeeeeeeeeeee================>", hee.transactionHash.data)
        

        var result = await admitModel.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                "TypeOform":TypeOform,
                "candiName":candiName,
                "motherName":motherName,
                "fatherName":fatherName,
                "dob":dob,
                "MobNo":MobNo,
                "RollNo":RollNo,
                "AdharNo":AdharNo,
                "schoolCode":schoolCode,
                "schoolName":schoolName,
                "status": "verified by institute",
                "message":"validated data by Institute",
                "txHash": hee.transactionHash.data,
                "created_At":new Date()
            },
            $push: {
                "previousHashes": hee.transactionHash.data
            }

        }, {
            new: true
        })
        console.log("check your result====>>", result)
        console.log("hhhhhhhhhhhhhhhh================>", result)
        return resolve({
            status:200,
            result: result
        })
    });

}