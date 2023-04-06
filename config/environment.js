const fs = require('fs');
const rfs = require('rotating-file-stream');
const path=require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory

})

const development = {
    name: "development",
    asset_path: './assets',
    session_cookie_key: 'universe',
    db: 'codeail_development',
    atlas_db_URI:`mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASS}@cluster0.umrwoom.mongodb.net/test?retryWrites=true&w=majority`,
    smtp_obj: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "tests11336699@gmail.com",
          pass: "bdeetuxivplctayo"
        }
      },
      googleClientID: '388485113850-hst46lr1p8issh3heakmrbgcd2m3atln.apps.googleusercontent.com',
      googleClientSecret: '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',
      googleCallbackURL: 'http://localhost:8000/users/auth/google/callback',
      githubClientID: '3236843a9e282c30fbc9',
      githubClientSecret: '71140f87aa86fc85055d62bfffc918f63b37e237',
      githubCallbackURL: 'http://localhost:8000/users/auth/github/callback',
      jwt_secret: 'codeail',
      morgan:{
        mode: 'dev',
        options:{
          stream: accessLogStream,
        },
        
      }

}

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