'use strict';
const AdminUpload = require('../models/uploaded');

exports.GetDocumentsHSC = () => {
	return new Promise(function (resolve, reject) {
        
		AdminUpload.find({"DocumentType":"HSC"})
			.then(function (result) {
                return resolve({
                    result:result,
                    
                })
				
			})


	});
}