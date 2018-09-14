const nem = require("nem-sdk").default;
const crypto = require("crypto");
const uploads = require("../models/uploaded")


exports.history = (name) => {

	return new Promise(async(resolve, reject) => {
		UserAccount = await uploads.find({
			"name": name
		})
		console.log("UserAccount===============>>>", UserAccount[0].txHash)
		// Create an NIS endpoint object
		var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);


		// let results= await uploads.find({"DocumentType":DocumentCategory})
		// console.log(results)
		// var str=(JSON.stringify(results));
		// console.log("str=========================>",str);
		// var store=await nem.com.requests.account.transactions.all(endpoint, address,txhash).then(function(res) {
		//         for(var a=0;a<res.data.length-1;a++){

		//             var msg =res.data[a].transaction.message.payload
		//             var fmt = nem.utils.format.hexToUtf8(msg);
		//             console.log(fmt)
		//         tx                                                                                   ash = (res.data[res.data.length-1].meta.hash.data)
		//         console.log("array inside s=============>>",historyArray.push(fmt))
		//         }
		var AllTransaction = nem.com.requests.transaction.byHash(endpoint, UserAccount[0].txHash).then(function (res) {
			console.log(res.transaction.message.payload)
			var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
			console.log("fmt==========>>>", fmt)

			return resolve({
				"status": 200,
				"message": JSON.parse(fmt)
			})

		})
	})
}