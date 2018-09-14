'use strict';
const nem = require("nem-sdk").default;
const uploads=require("../models/uploaded");
const admitModel = require('../models/admitCard');
const puppeteer=require('puppeteer');


exports.KeypairSignature = (name,userId,DuplicateRequestStatus)=>{
    
    return new Promise(async(resolve,reject)=>{
    const results= await  uploads.find({ "userId":userId});
    console.log("output fetch==========>>",results);
   
    var SeatNumber= results[0].SeatNumber;
    var motherName= results[0].motherName;
  

    const privateKey="19765d0b9f11616d8b851f5deaaae56ec451eae39727b4fdeb278e05a94c05b8";


    // Create keypair
    var kp = nem.crypto.keyPair.create(privateKey);
    
    // Data to sign
    var data = {
        "candiName":name,
        "DuplicateRequestStatus":DuplicateRequestStatus,
        "SeatNumber":SeatNumber,
        "motherName":motherName
    }
    var jsondata=JSON.stringify(data)
    // Sign data
    var sig = kp.sign(jsondata);
    // console.log("Sign Data===>",sig);
    
    // Review
    console.log("Public key: " + kp.publicKey.toString());
    console.log("Original data: " + data);
    console.log("Signature: " + sig.toString());
    var Sign=sig.toString();
    console.log("signature response",Sign)
    
//=====================================bringing marksheet template==============================
try{
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    const HeadingName="Hall Ticket"
    const ImgSrc=__dirname+'/MH.png'
    console.log("ImgSrc==========",ImgSrc)
   const htmlDoc= await page.setContent(`<!DOCTYPE html>
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
                <td>${SeatNumber}</td>
                <td>1452</td>
                <td>16.16.015</td>
                <td>MARCH-2010</td>
                <td></td>
             </tr>
          </table>
       </div>
       <div class="row">
          <h3><b>CANDIDATE FULL NAME (SURNAME FIRST)</b></h3>
          <h4>${name}</h4>
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
             <table>
             <br>
             <b>Digitally Signed by Division</b>
             <a href="#">
             <span class="glyphicon glyphicon-ok-sign"></span>
           </a>
             <br/>Signature:
             
             <br/><label style="color:blue;width:60%;">${Sign}</label>
             </table>
       </div>
    </div>
 </div>
 <br> 
    </body>
    </html>
    `);
    await page.emulateMedia('screen');
   var DocumentStored= await page.pdf({
        path:'/home/kheteshr/Documents/Duplicate_SSC_Marksheet_pdf.pdf',
        format:'A4',
        printBackground:true
    })

    console.log("guess done",htmlDoc,DocumentStored);
   
  
} catch(e){
    console.log('our error',e)
    return reject({
        message:"not done"
    })
}

//==============================================================================================
    await admitModel.findOneAndUpdate( {"userId":userId},{
        $set: {
            "DuplicateRequestStatus":DuplicateRequestStatus,
            "Request_At":new Date()
        }
    },{
        new: true
    }).then(function (result) {
        console.log("check your result====>>",result)
            return resolve({
                result:result
            })
        })

})
}