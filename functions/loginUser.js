'use strict';
const user = require('../models/account')

exports.login = (UserName, password) => {

	return new Promise(function (resolve, reject) {

		console.log("Entering into login fun");


		user.find({
				$and: [{
					"walletName": UserName
				}, {
					"password": password
				}]
			})
			.then(function (users) {
				if (users.length != 0) {
					return resolve({
						status: 200,
						users: users[0]
					});

				} else if (users.length == 0) {

					return reject({
						status: 401,
						message: 'Invalid Credentials !'
					});
				}
			})


	});
}