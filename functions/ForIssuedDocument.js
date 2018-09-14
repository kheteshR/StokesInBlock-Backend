'use strict';
const user = require('../models/uploaded')

exports.Issued = (userId) => {

	return new Promise(function (resolve, reject) {

		console.log("Enter======>>>",userId);


		user.find({
					"userId": userId
			})
			.then(function (users) {
				
				if (users.length != 0) {

					return resolve({
                        status: 200,
                        result:users
						
					});

				} else if (users.length == 0) {

					return resolve({
						status: 201,
						message: 'No Document fetched yet!'
					});
				}
			})


	});
}