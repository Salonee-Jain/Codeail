const fs = require('fs');
const path=require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs()

const development = {
    name: "development",
    asset_path: '/assets',
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
      jwt_secret: 'codeail'

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
      jwt_secret: process.env.JWT_SECRET,
}

module.exports = eval(process.env.CODEAIL_ENVIRONMENT)==undefined?development:eval(process.env.CODEAIL_ENVIRONMENT);