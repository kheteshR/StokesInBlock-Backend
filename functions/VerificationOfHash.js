'use strict';
const nem = require("nem-sdk").default;
const upload = require('../models/uploaded');

exports.CompareHash = ((TransactionHash) => {
    return new Promise(async(resolve, reject) => {
        console.log("report=============>", TransactionHash);
        //  Create an NIS endpoint object
        var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);
        console.log("mijin default port", nem.model.nodes.mijinPort);
        var AllTransaction = await(nem.com.requests.transaction.byHash(endpoint, TransactionHash));
        console.log(AllTransaction.transaction.message.payload);
        var fmt = nem.utils.format.hexToUtf8(AllTransaction.transaction.message.payload);
        console.log("fmt======>", fmt);
        console.log("StatusSaved==========>>", fmt);
        var txObj = JSON.parse(fmt);
        console.log("txObj============>", txObj);
        return resolve({
            result: txObj
        })

    }).catch(err => {
        console.log(err)
    });
})