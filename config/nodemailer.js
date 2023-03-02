const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodeMailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f5e5650727a34a",
    pass: "e376b79b600b6d"
  }
});


let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer', relativePath)),
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