'use strict';
const nem = require("nem-sdk").default;
const upload = require('../models/uploaded');

exports.GetHash = ((name, Doc, SeatNumber) => {


    return new Promise(async(resolve, reject) => {

        var report = await upload.find({
            "name": name,
            "DocumentType": Doc,
            "SeatNumber": SeatNumber
        });
        console.log("report=============>", report)

        var ContentHash = report[0].filesHash[0].hash;
        console.log("ContentHash >>>>", ContentHash);
        var TransactionHash = report[0].txHash;
        console.log("TransactionHash", TransactionHash);
        return resolve({
            result: report,
            ContentHash: ContentHash,
            TransactionHash: TransactionHash
        })

    }).catch(err => {
        console.log(err)
    });
})