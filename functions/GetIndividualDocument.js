'use strict';
const nem = require("nem-sdk").default;
const uploads = require("../models/uploaded")
const users = require("../models/account")

var fileHash;
var Transfer;
let UserAccount;
exports.GetIndividual = (name, SeatNumber, userId) => {
	console.log("name", name, SeatNumber)
	return new Promise(async(resolve, reject) => {
		UserAccount = await users.find({
			"walletName": name
		})
		console.log("privatekey", UserAccount[0].privateKey)
		var AddressProvider2 = UserAccount[0].Address
		let hash = await uploads.find({
			"name": name
		}).then(newhash => {
			console.log("newhash=========",newhash)
			console.log("newhash============>>", newhash[0].filesHash[0].hash)
			fileHash = newhash[0].filesHash[0].hash
			console.log("cross check=======>>", fileHash)
			var d = new Date();
			Transfer = {
				"ContentHash": newhash[0].filesHash[0].hash,
				"Document": newhash[0].DocumentType,
				"name": name,
				"SeatNumber": SeatNumber,
				"userId": userId,
				created_at: d.toString()
			}
		})
		console.log("out of then========>>", fileHash)
		var date = new Date();

		var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
		// Create a common object holding key
		var common = nem.model.objects.create("common")("123", "a6eb271bac6b5a533bfcc8523808c221c5fd4d854dee5623e41a55c8839882a3");

		// Create an un-prepared transfer transaction object

		var TransferObject = JSON.stringify(Transfer)
		var transferTransaction = nem.model.objects.create("transferTransaction")(AddressProvider2, 0, TransferObject);
		// Prepare the transfer transaction object
		var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);

		//Serialize transfer transaction and announce
		var ee = await nem.model.transactions.send(common, transactionEntity, endpoint)
		console.log(ee.transactionHash.data)
		
			let results = await uploads.findOneAndUpdate({
				"name": name
			}, {
				$set: {
					"userId": userId,
					"created_at":new Date()
				},
				$push: {
					"Downloaded": fileHash,
					"PullTxHash": ee.transactionHash.data
				}
			}, {
				new: true
			}).then(output => {
                // Address we'll use in some queries
                var AllTransaction=nem.com.requests.transaction.byHash(endpoint,"fd9b466e1190161030d79bd16c548aeb018d7c3736fb93402508f4f9ddd4511d").then(function(res) {
                    console.log(res.transaction.message.payload)
                    var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
                    console.log(fmt)
              
				console.log("StatusSaved==========>>", output)

				return resolve({
					status: 200,
					"message": "related data found for user",
                    "output": output,
                    "BC_Data":JSON.parse(fmt)
                })
            })

            
			})
		

	})
}