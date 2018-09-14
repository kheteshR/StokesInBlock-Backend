'use strict';
const admitModel = require('../models/admitCard');

exports.RetriveAll = () => {

	return new Promise(function (resolve, reject) {
		admitModel.find({})
			.then(function (result) {
		
                return resolve({
                    result:result
                })
				
			})


	});
}