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

(async function(){
    try{
        const browser= await puppeteer.launch();
        const page=await browser.newPage();
        const HeadingName="Hall Ticket"

        await page.setContent(`<!DOCTYPE html>
        <html>
        <head>
        <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }
        
        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        
        tr:nth-child(even) {
            background-color: #dddddd;
        }
        </style>
        </head>
        <body>
        
        <h2>HTML Table</h2>
        
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>${HeadingName}</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
          </tr>
        </table>
        
        </body>
        </html>
        `);
        await page.emulateMedia('screen');
        await page.pdf({
            path:'mypdf.pdf',
            format:'A4',
            printBackground:true
        });
        console.log("guess done");
        await browser.close();
        process.exit();
    } catch(e){
        console.log('our error',e)
    }
})()

