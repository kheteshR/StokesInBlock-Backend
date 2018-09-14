'use strict';
const RequestModel = require('../models/request')
const nem = require("nem-sdk").default;
const crypto = require("crypto");

exports.GetAllReq = (RecipientuserId) => {

    return new Promise(function(resolve, reject) {
        console.log("RecipientuserId=====>>", RecipientuserId)

        RequestModel.find({
                "RecipientuserId": RecipientuserId
            })
            .then(function(request) {

                // Create an NIS endpoint object
                var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", nem.model.nodes.mijinPort);
                for (var i = 0; i < request.length; i++) {
                    console.log("request.length=======>", request.length)
                    var transaction = request[0].TransactionHash;
                    var AllTransaction = nem.com.requests.transaction.byHash(endpoint, request[0].TransactionHash).then(function(res) {
                        console.log(res.transaction.message.payload)
                        var fmt = nem.utils.format.hexToUtf8(res.transaction.message.payload);
                        console.log(fmt)

                        console.log("StatusSaved==========>>", request[0].TransactionHash)

                        return resolve({
                            "message": request,
                            "BC_Data": JSON.parse(fmt)
                        })


                    })
                }
            });
    })
}