'use strict';
const admitModel = require('../models/admitCard');

exports.GenerateHallTicket = () => {

	return new Promise(function (resolve, reject) {
        var arr2 = ['Holy cross school','Abhinav School','Saraswati school','St. francis school','St. xaviours school','RBK school','vivekanand kendra vidyalaya','Don bosco high school'];
        console.log(arr2)
        var i = arr2[Math.floor(Math.random()*arr2.length)];
        console.log("random=======>>",i);
		admitModel.find({
				
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