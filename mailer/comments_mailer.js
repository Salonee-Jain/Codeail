const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    
    // we used third parrty emailer
    nodeMailer.transporter.sendMail({
        from: 'codezee4@gmail.com',
        to: comment.user.email.trim(),
        subject: "comment published",
        html: htmlString,
    }, (err, info)=>{
        if(err){console.log("Error in sending the mail", err); return;}
        console.log("Mail deleiced", info)
        return;
    })
}