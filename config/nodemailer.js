const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
var smtpTransport = require("nodemailer-smtp-transport");
const env = require('./environment');
var transporter = nodeMailer.createTransport(env.smtp_obj);



let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
      path.join(__dirname, '../views/mailer', relativePath),
      data,
      function(err, template){
       if (err){console.log('error in rendering template', err); return}
      //  console.log(template)
       mailHTML = template;
      }
  )

  return mailHTML;
}



  module.exports ={
    transporter: transporter,
    renderTemplate : renderTemplate,
  }