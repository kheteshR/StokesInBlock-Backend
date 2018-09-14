var express = require('express'),
    fs = require('fs'),
    app = express();

app.get('/pdf', function (req, res) {
    var filePath = "/home/kheteshr/Downloads/SSC_Marksheet_pdf.pdf";

    fs.readFile(filePath , function (err,data){
        res.contentType("application/pdf");
        res.download(data);
    });
});

app.listen(3000, function(){
    console.log('Listening on 3000');
});