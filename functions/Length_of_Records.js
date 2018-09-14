'use strict';
const admitModel = require('../models/admitCard');

exports.GetLength = (Type) => {
    console.log("Type========",Type);

	return new Promise(function (resolve, reject) {
        
		admitModel.find({"TypeOform":Type})
			.then(function (result) {
                return resolve({
                    SSCresult:result
                })
				
			})


	});
}


