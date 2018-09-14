'use strict';
const user = require('../models/request')
const crypto= require("crypto");
var nem = require("nem-sdk").default;
const identity = require('../models/Identity');
exports.SetStatusByDivisionalBoard = (_id,status) => {

    console.log("status=======", status, _id);
    return new Promise(async (resolve, reject) => {
       
        
        const output = await user.find({
            _id: _id
        });
        var str=JSON.stringify(output);
        console.log("str=======>",str)
        console.log("output====", output);
        
        var SpendingAmount = output[0]._doc.SpendingAmount;
        var RequesterAddress = output[0]._doc.RequesterAddress;
        var userId = output[0]._doc.userId;
       
        
       const ident=await identity.find({
        userId:userId
           
       })
      console.log("Identity========>",ident[0].balance);
      var UserActualBal=ident[0].balance-SpendingAmount;
      console.log("UserActualBal=================>",UserActualBal)
      
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
        var NemObj = {
            "id": _id,
            "SpendingAmount": SpendingAmount,
            "userId": userId,
            "RequesterAddress": RequesterAddress,
            "DeductedAmount":SpendingAmount,
            "created_At":new Date(),
            "status": "Settlement processed by bank"
           
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
        // var result =await (admitModel.findOneAndUpdate({ _id:id }, { $set: { "status":status,"message":message,"txHash":hee.transactionHash.data},$push:{"previousHashes":hee.transactionHash.data}},{new: true}))

        var result = await identity.findOneAndUpdate({
            userId:userId
        }, {
            $set: {
                "status":status,
                "balance":UserActualBal,
                "txHash": hee.transactionHash.data,
                "NoOfToken":"2",
                "created_At":new Date()
            }
           

        }, {
            new: true
        })
        console.log("check your result====>>", result)
        return resolve({
            result: result
        })
    });

}