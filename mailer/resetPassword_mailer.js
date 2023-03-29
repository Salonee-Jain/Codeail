const nodeMailer = require('../config/nodemailer');

exports.newReset = (user)=>{
    console.log('inside new email mailer');
    let htmlString = nodeMailer.renderTemplate({user: user}, '/reset/reset_password.ejs');
 
  
    nodeMailer.transporter.sendMail({
        from: 'tests11336699@gmail.com',
        to: user.email,
        subject: "This is reset link",
        html: htmlString,
    }, (err, info)=>{
        if(err){console.log("Error in sending the mail", err); return;}
        // console.log("Mail deleiced", info)
        return;
    })
}
