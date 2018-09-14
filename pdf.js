var pdf=require('pdfkit');
var fs=require('fs');

var myDoc=new pdf;
myDoc.pipe(fs.createWriteStream('node.pdf'));

myDoc.font('Times-Roman')
.fontSize(48)
.text("Tommorrow at 4:45pm ok..........",100,100);

myDoc.end();
