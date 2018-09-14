var pdf = require('html-pdf');
var options = {format: 'Letter'};
exports.Topdf = function (req, res) {
var info = {
"Company": "ABC",
"Team": "JsonNode",
"Number of members": 4,
"Time to finish": "1 day"
}

res.render('path to your tempalate', {
   info: info,
}, function (err, HTML) {
   pdf.create(HTML, options).toFile('/home/kheteshr/DMS_LatestCreated/app/templates/app-form.hbs', function (err, result) {
       if (err) {
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       }
   })
 })
}