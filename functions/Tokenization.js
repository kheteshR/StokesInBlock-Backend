'use strict'

const identity = require('../models/Identity');
const nem=require("nem-sdk").default;
const crypto= require("crypto");
exports.data_for_useridentity = (firstname,lastname,usertype,age,pan,aadhar,address,emailid,status,userId) =>{
console.log(firstname,lastname,usertype,age,pan,aadhar,address,emailid,status)
return new Promise(async(resolve, reject) => {
    var NemObj = {
        "firstname": firstname,
        "lastname": lastname,
        "usertype": usertype,
        "age": age,
        "pan": pan,
        "aadhar": aadhar,
        "address": address,
        "emailid": emailid,
        "created_At":new Date(),
        "status": status,
        "userId":userId,
        "balance":"10000"
        
    }
    var str = JSON.stringify(NemObj);
    console.log("=======>",str)
    const rapidID = crypto.createHash('sha256').update(str).digest('base64');
        console.log("repidID...........",rapidID)
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
 // Create a common object holding key
 var common = nem.model.objects.create("common")("123", "393a5d8aca6c4e2dd6dcfd6fa5f2ddd228597d6b903ea7e60db91df4443d76ca");
 // Create an un-prepared transfer transaction objecpatientst
 var transferTransaction = nem.model.objects.create("transferTransaction")("MDG56GVWJ455VUJJCLUSYB32UG2Q7RBD2EYHMRHW", 0, str); //divisional board will send status to Institution
 // Prepare the transfer transaction object
 var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);
 //Serialize transfer transaction and announce
 var hee = await nem.model.transactions.send(common, transactionEntity, endpoint)
 console.log("heeeeeeeeeeeeeeeeee================>", hee.transactionHash.data)


  const newdata= new identity({
         firstname:firstname,
         lastname:lastname,
         usertype:usertype,
         age:age,
         pan:pan,
         aadhar:aadhar,
         address:address,
         emailid:emailid,
         DigitalIdentity:hee.transactionHash.data,
         rapidID:rapidID,
         status:status,
         userId:userId,
         "created_At":new Date(),
         "balance":"10000"

  });
  

await newdata.save()
  .then(data=>{
    return resolve({
        message: "Digital Identity Generated",
        data:data
    }) 
  })



})
}