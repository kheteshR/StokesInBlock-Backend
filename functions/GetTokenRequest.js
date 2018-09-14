'use strict';
const user = require('../models/request')

exports.GetAllReq = (RxAddress) => {

	return new Promise(function (resolve, reject) {
        console.log("RxAddress=====>>",RxAddress)

		user.find({
				"RxAddress":RxAddress
			})
			.then(function (request) {
				console.log("request.length",request.length)
				if (request.length !== 0) {
					return resolve({
						status: 200,
						request: request
					});

				} else if (request.length == 0) {

					return resolve({
						
						status: "no request yet generated"
					});
				}
			})


	});
}