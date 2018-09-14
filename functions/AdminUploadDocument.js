'use strict';
const AdminUpload = require('../models/uploaded');

exports.GetDocuments = () => {
	return new Promise(function (resolve, reject) {
        
		AdminUpload.find({})
			.then(function (result) {
                return resolve({
                    result:result,
                    filehash:result.filesHash
                })
				
			})


	});
}