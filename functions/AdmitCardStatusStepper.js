'use strict';

const admitModel = require('../models/admitCard');
exports.GetDocuments = (userId) => {
	return new Promise(function (resolve, reject) {
        
		admitModel.find({"userId":userId})
			.then(function (result) {
                return resolve({
                    result:result  
                })
				
			})


	});
}