var puppeteer=require('puppeteer');
var fs=require('fs-extra');
var hbs=require('handlebars');
var path=require('path');
var moment=require('moment');

// const compiler=async function(templateName,data){
//     const filePath=path.join(process.cwd(),'templates',`${templateName}.hbs`);
//     const html=await fs.readFile(filePath,'utf-8');
//     return hbs.compile(html);
// };
// hbs.registerHelper('dateFormat', function(value,format){
// console.log('formatting',value,format);
// return moment(value).format(format);
// });
exports.PdfDocument = (Seat_Number,candiName,fatherName,HallCenter,motherName,dob,MobNo,TypeOform) => {

    return new Promise(async function(resolve,reject){
    try{
        const browser= await puppeteer.launch();
        const page=await browser.newPage();
        const HeadingName="Hall Ticket"

        await page.setContent(`<!DOCTYPE html>
        <html>
        <head>
        <style>
        .card{
            position: relative;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            background-color: #fff;
            border: 2px solid #000;
           }
        .flex-container { 
        width:80%;
        height: 650px;
        background-color:#FFB6C1;
        text-align: center;
        margin-left:10%;
        }
        .text{
        text-align:center;
        }
        table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        }
        td, th {
        border: 2px solid #000;;
        text-align: left;
        padding: 8px;
        }
        tr:nth-child(even) {
        background-color: #dddddd;
        }
     </style>
        </head>
        <body>
        
       
     <div class="card flex-container">
        <div class="card-block">
           <div class="row">
              <div class="col-lg-2" style="background-color:">
                 <img class="Fix-Image" style="	margin-left:0px;" src="assets/MH.png">
              </div>
              <div class="col-lg-8" style="background-color:">
                 <h2><b>Maharashtra State Board Secondary and Higher Secondary Education,Pune</b></h2>
     
              </div>
           </div>
        
           <div class="row">
                 <h3><b>ADMISSION CARD,${TypeOform} EXAM</b></h3>
                 <table>
                 <tr>
                    <th>DIV BOARD</th>
                    <th>DIST.& JR.COLL NO</th>
                    <th>CENTER NO.</th>
                    <th>M/F</th>
                    <th>STREAM</th>
                 </tr>
                 <tr>
                    <td>MUMBAI</td>
                    <td>1452</td>
                    <td>16.16.015</td>
                    <td>MARCH-2010</td>
                    <td></td>
                 </tr>
              </table>
           </div>
           <div class="row">
              <div class="col-lg-6">
              <h3><b style="float:left;">Name:${candiName}</b></h3><br>
              <h3><b style="float:left;">Mother's Name: ${motherName}</b></h3><br>
              <h3><b style="float:left;">Seat No.: ${Seat_Number}</b></h3><br>
              <h3><b style="float:left;">Center Name:${HallCenter}</b></h3><br>
              </div>
           </div> 
              <div class="row">
              <table>
                 <tr>
                    <th><b>Subject Name</b></th>
                    <th>ENG</th>
                    <th>HINDI</th>
                    <th>MATHS</th>
                    <th>MARATHI</th>
                    <th>SCIENCE</th>
                    <th>SOC SCIENCE</th>
                 </tr>
                 <tr>
                    <td><b>Language of Ans</b></td>
                    <td>ENG</td>
                    <td>HINDI</td>
                    <td>ENG</td>
                    <td>MARATHI</td>
                    <td>ENG</td>
                    <td>ENG</td>
                 </tr>
              </table>
           </div>
        </div>
     </div>
     <br>
     </body>
        </html>
        `);
        await page.emulateMedia('screen');
        await page.pdf({
            path:'hallticket.pdf',
            format:'A4',
            printBackground:true
        }).then(result=>{
            return resolve({
            message:"pdf conversion done",
            result: (new Buffer(result)).toString('base64')
        })
    })
        console.log("guess done");
        // await browser.close();
        //  var result=await process.exit(    
        //  )
      
    } catch(e){
        console.log('our error',e)
        return reject({
            message:"not done"
        })
    }
})
}
