const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
 
   
    nodeMailer.transporter.sendMail({
        from: 'tests11336699@gmail.com',
        to: comment.user.email,
        subject: "This is a comment published automated mail",
        html: htmlString,
    }, (err, info)=>{
        if(err){console.log("Error in sending the mail", err); return;}
        // console.log("Mail deleiced", info)
        return;
    })
}
