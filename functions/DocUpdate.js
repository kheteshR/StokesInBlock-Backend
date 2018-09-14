'use strict';
const nem = require("nem-sdk").default;
const uploads = require("../models/uploaded")
const crypto = require("crypto");
var AddressProvider1 = "MCDJYXQWCRFJUBUZK5QGIWUFSB3GLZW4VKAC72QM"
var AddressProvider2 = "MADHELDXSCFEX6GNQUK5OQMCAVQI37KPPCMHX4WE"


exports.UpdateDocuments = (fileOutput,documentType,Name,usertype,message,status) =>

    new Promise(async (resolve, reject) => {
        console.log("check name =====>",Name)
        uploads.find({
            "name": Name
        }).then(result => {
            console.log("updated doc....", result)

            var UpdateResult = result;
            var Doc = UpdateResult[0]._doc._id
            console.log("please look=========>>", Doc)
            console.log("check output=========>>>", UpdateResult[0]._doc)
      
            var Transfer = {
                "OldContentHash":fileOutput[0].hash,
                "NewContentHash": fileOutput[fileOutput.length-1].hash,
                "Document": documentType,
                "name": Name,
                "message":message,
                "SeatNumber": "1234",
                created_at: new Date()
        }

            var str = JSON.stringify(Transfer);
            console.log("stringified object=========>>>", str)



            if (status == "Updated") {
                new Promise(async (resolve, reject) => {

                    var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
                    // Create a common object holding key
                    var common = nem.model.objects.create("common")("123", "df80a6ccf1f539be59b5621605399b559e2dcde5eaef01272f9277775b4deeeb");

                    // Create an un-prepared transfer transaction objecpatientst

                    var transferTransaction = nem.model.objects.create("transferTransaction")(AddressProvider2, 0, str);
                    // Prepare the transfer transaction object
                    var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
                    //Serialize transfer transaction and announce
                    var Transaction = await nem.model.transactions.send(common, transactionEntity, endpoint)
                    console.log("heeeeeeeeeeeeeeeeee================>", Transaction.transactionHash.data)
                    var result = await (uploads.findOneAndUpdate({
                        "_id": Doc
                    }, { $set:{"status":status,"message":message,"txHash":Transaction.transactionHash.data,"created_at":new Date},
                        $push: {
                            "NewfileHash": fileOutput,
                            "previousHashes":Transaction.transactionHash.data
                        }
                    }, {
                        new: true
                    }))
                    console.log("Result after storing data in DataBase================>", result)
                    return resolve({
                    "status": 200,
            })

                })
            }
            return resolve({
                "status": 200,
                "messsage": "object updated",
                "Updatedresult":result
            })
           
        }).catch(err => {
            console.log(err)
        })

    })
