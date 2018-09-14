'use strict';
const uploads=require("../models/uploaded");
const admitModel = require('../models/admitCard');
exports.get = (DuplicateRequestStatus) => {
	return new Promise(function (resolve, reject) {
		admitModel.find({
					"DuplicateRequestStatus": DuplicateRequestStatus
				})
			.then(function (Record) {
				if (Record.length != 0) {
					return resolve({
                        status: 200,
                        Record:Record
					
					});

				} else if (Record.length == 0) {

					return reject({
						status: 401,
						message: 'Invalid status !'
					});
				}
			})


	});
}