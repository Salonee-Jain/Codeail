const fs = require('fs');
const rfs = require('rotating-file-stream');
const path=require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory

})


const production = {
    name: "production",
    asset_path: process.env.ASSETS_PATH,
    session_cookie_key: process.env.ATLAS_DB_URI,
    db: process.env.CODEAIL_DB,
    atlas_db_URI:process.env.ATLAS_DB_URI,
    smtp_obj: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.CODEAIL_GMAIL_USER,
          pass: process.env.CODEAIL_GMAIL_PASS,
        }
      },
      googleClientID: process.env.GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
      googleCallbackURL: process.env.GOOGLE_CALLBACK_URL,
      githubClientID: process.env.GITHUB_CLIENT_ID,
      githubClientSecret:process.env.GITHUB_CLIENT_SECRET,
      githubCallbackURL:process.env.GITHUB_CALLBACK_URL ,
      jwt_secret: process.env.JWT_SECRET,
      morgan:{
        mode: 'combined',
        options:{
          stream: accessLogStream,
        },
        
      }
}

module.exports = eval(process.env.NODE_ENV)==undefined?development:eval(process.env.NODE_ENV);