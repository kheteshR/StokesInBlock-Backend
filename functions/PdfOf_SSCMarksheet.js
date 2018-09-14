var puppeteer=require('puppeteer');
var fs=require('fs-extra');
var hbs=require('handlebars');
var path=require('path');
var moment=require('moment');

exports.PdfDocumentSSCMARKSHEET = (Seat_Number,candiName,fatherName,HallCenter,motherName,dob,MobNo,TypeOform) => {

    return new Promise(async function(resolve,reject){
    try{
        const browser= await puppeteer.launch();
        const page=await browser.newPage();
        const HeadingName="Hall Ticket"
        const ImgSrc=__dirname+'/MH.png'
        console.log("ImgSrc==========",ImgSrc)
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
        height: 1000px;
        // background-color: rgba(0, 0, 150, .3);
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
        .Fix-Image{
            width: 152px;
            margin-top:50px;
            margin-left:95px;
            height: 144px;
          }
        </style>
        </head>
        <body>
        
        <div class="card flex-container">
        <div class="card-block">
           <div class="row">
              <div class="col-lg-2" style="background-color:">
                 <img class="Fix-Image" style="	margin-left:0px;" src='/home/kheteshr/Desktop/MaharashtraDocManagement-Backend/functions/MH.png'>
              </div>
              <div class="col-lg-8" style="background-color:">
                 <h2><b>Maharashtra State Board Secondary and Higher Secondary Education,Pune</b></h2>
                 <h4 class="text">Division:Mumbai</h4>
              </div>
           </div>
           <div class="row">
              <h3><b>SECONDARY SCHOOL CERTIFICATE EXAMINATION-STATEMENT OF MARKS</b></h3>
           </div>
           <div class="row">
              <table>
                 <tr>
                    <th>SEAT NO.</th>
                    <th>CENTER NO.</th>
                    <th>DIST. & SCHOOL NO.</th>
                    <th>MONTH & YEAR OF EXAM</th>
                    <th>SR.NO. OF STATEMENT</th>
                 </tr>
                 <tr>
                    <td>${Seat_Number}</td>
                    <td>1452</td>
                    <td>16.16.015</td>
                    <td>MARCH-2010</td>
                    <td></td>
                 </tr>
              </table>
           </div>
           <div class="row">
              <h3><b>CANDIDATE FULL NAME (SURNAME FIRST)</b></h3>
              <h4>${candiName}</h4>
           </div>
           <div class="row" style="">
              <div class="col-lg-12">
                 <h3><b style="">CANDIDATE MOTHER'S NAME:</b><h4>${motherName}</h4></h3> 
              </div>
              
           </div>
           <div class="row">
              <table>
                 <tr>
                    <th>Subject Code No. and Subject name</th>
                    <th>Max. Marks</th>
                    <th>Marks In Figure</th>
                    <th>Marks in Words</th>
                  
                 </tr>
                 <tr>
                    <td>02 HINDI<br>
                    16 MARATHI<br>
                    17 ENGLISH<br>
                    71 MATHEMATICS<br>
                    72 SCIENCE<br>
                    73 SOCIEL SCIENCE<br>
                    </td>
                    <td>100<br>
                    100<br>
                    100<br>
                    150<br>
                    100<br>
                    100<br></td>
                    <td>
                        076<br>
                    073<br>
                    069<br>
                    120<br>
                    079<br>
                    065<br>
                    </td>
                    <td></td>
                  
                 </tr>
                
              </table>
               <table>
                   <tr>
                    <th><b>Result</b></th>
                   <th><b>Percentage</b></th>
                   <th></th>
                   <th></th>
                   <th></th>
                   <th></th>
                   </tr>
                    <tr> 
                    <td>
                    <br>PASS</td>
                    <td><br>
                    76%</td>
                    <td><b>Total Marks</b></td>
                    <td>550</td>
                    <td>417</td>
                    <td></td>
                 </tr>
                 </table>
                 <br>
                 <b>Digitally Signed by Division</b>
                 <br/>Signature:<label style="color:blue">${Sign}</label>
           </div>
        </div>
     </div>
     <br> 
        </body>
        </html>
        `);
        await page.emulateMedia('screen');
        await page.pdf({
            path:'/home/kheteshr/Downloads/SSC_Marksheet_pdf.pdf',
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
