'use strict';
const nem = require("nem-sdk").default;
const uploads = require("../models/uploaded")
const users = require("../models/account")
const Requests = require('../models/request')
const identity = require('../models/Identity');
var Transfer;

exports.Sharing = (userId, status,SpendingAmount,NumberOfToken,RxAddress) => {
	console.log("All keys==============>>>>>",userId,status,SpendingAmount,NumberOfToken,RxAddress)
	return new Promise(async(resolve, reject) => {
        var key=await users.find({
            "userId":userId
        })
        var  iden=await identity.find({
            "userId":userId
        })
        console.log("identification================>",iden[0].DigitalIdentity)
        
        var SenderPrivateKey=key[0].privateKey;//receiver will send Document
        var walletName=key[0].walletName;
        var RequesterAddress=key[0].nem_id.accounts[0].address;

        console.log("Object for private key",key[0].privateKey,RequesterAddress)//private key of receiver      
        console.log("Object for private key",key[0].walletName)
        

        var d = new Date();
        Transfer = {
            "userId": userId,
            "RequesterAddress":RequesterAddress,
            "Requester":walletName,
            "SpendingAmount":SpendingAmount,
            "status": status,
            "NumberOfToken":NumberOfToken,
            "RxAddress":RxAddress,
            "RequesterDigitalIdentity":iden[0].DigitalIdentity,
             created_at: d.toString()
        }
        var SendObject=JSON.stringify(Transfer)
        console.log("SendObject=====>>",SendObject)
        //created NIS endpoint
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
		// Create a common object holding key
		var common = nem.model.objects.create("common")("123", SenderPrivateKey);
        
        var transferTransaction = nem.model.objects.create("transferTransaction")(RxAddress, 0, SendObject);
		// Prepare the transfer transaction object
		var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);

		//Serialize transfer transaction and announce
		var ee = await nem.model.transactions.send(common, transactionEntity, endpoint)
        console.log(ee.transactionHash.data)
        let updateuser=new Requests({
            "userId":userId,
            "status":status,
            "RequesterAddress":RequesterAddress,
            "Requester":walletName,
            "SpendingAmount":SpendingAmount,
            "RxAddress":RxAddress,
            "transactionHash":ee.transactionHash.data,
            "RequesterDigitalIdentity":iden[0].DigitalIdentity,
            created_at: d.toString()
       
        })
        updateuser.save()
        .then(output => {
			return resolve({
                "status":200,
                "message": "sent sucessfully",
                "result":output
			})

		})
	})
}