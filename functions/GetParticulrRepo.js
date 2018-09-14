'use strict';
const nem = require("nem-sdk").default;
const uploads=require("../models/uploaded")


exports.GetParticulrDocumets = (userId)=>{
    
    return new Promise(async(resolve,reject)=>{
    
    let results= await  uploads.find({ "userId":userId }).then(output=>{
    console.log("StatusSaved==========>>",output)
    //endpoints creation
    var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
    var LengthOfTx=output[0].PullTxHash.length
    console.log("LengthOfTx",LengthOfTx);
    var LastTxHash=output[0].PullTxHash[LengthOfTx-1];
    console.log("LastTxHash",LastTxHash[LengthOfTx-1]);
    var AllTransaction=  nem.com.requests.transaction.byHash(endpoint,LastTxHash).then(function(res) {
        console.log(res.transaction.message.payload)
        var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
        console.log("fmt==========>>>",fmt)
  
        return resolve({
            "output":JSON.parse(fmt)
        })
    })
    })
})
}