'use strict';
const admitModel = require('../models/admitCard');

exports.GetNotify = (Type) => {
    console.log("Type========",Type);

	return new Promise(function (resolve, reject) {
        
		admitModel.find({"userId":Type})
			.then(function (result) {
                return resolve({
                    SSCresult:result
                })
				
			})


	});
}