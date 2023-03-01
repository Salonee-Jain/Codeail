const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "codezee4", // generated ethereal user
      pass: 'Afiniafi4*' // generated ethereal password
    },
})



let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativePath)),
        data,
        function(err, template){
            if(err){console.log("Error loading template", err);return;}
            mailHTML = template;
        }   
        return mailHTML;
}




  module.exports ={
    transporter: transporter,
    renderTemplate : renderTemplate,
  }