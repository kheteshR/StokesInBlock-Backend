'use strict';
var hash = require('../models/admitCard');
const nem = require("nem-sdk").default;
const crypto = require("crypto");
exports.AuditTrailOfAdmitCard = (id)=>{
    return new Promise(async (resolve, reject)=>{
       //console.log("RecipientuserId=====>>",)
       // var id = "5b837d006c80d41d04750565";
       var result=await hash.find({
                "_id": id
            })
            var txObjArray=[];
        console.log("result==========>",result);
        console.log("previoushash==========>",result[0].previousHashes);

               // Create an NIS endpoint object
               var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);
               console.log("result[0].previousHashes.length",nem.model.nodes.mijinPort)
               for(var i=0;i<result[0].previousHashes.length;i++){
               var AllTransaction=await (nem.com.requests.transaction.byHash(endpoint,result[0].previousHashes[i]))
                   console.log(AllTransaction.transaction.message.payload)
                   var fmt = await nem.utils.format.hexToUtf8(AllTransaction.transaction.message.payload);
                //    console.log(fmt)

                console.log("StatusSaved==========>>", fmt)
                var txObj=JSON.parse(fmt)
              
                txObjArray.push(txObj)
                console.log("transaction object==========",txObj)
                console.log("txObjArray object==========",txObjArray)
       }
       return resolve({
           "status":200,
           "result": txObjArray
       });

})
}