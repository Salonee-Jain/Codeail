const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user')
const env = require('./environment')
///https://console.cloud.google.com/apis/credentials/oauthclient/388485113850-hst46lr1p8issh3heakmrbgcd2m3atln.apps.googleusercontent.com?project=codeail-sample-379117

passport.use(new GoogleStrategy({
    clientID: env.googleClientID,
    clientSecret: env.googleClientSecret,
    callbackURL: env.googleCallbackURL,
   
},
    function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log("Error in google strategy passport: ", error); return; }
            console.log(profile);

            if (user) {
                return done(null, user)
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0].value,
                }, function (err, user) {
                    if (err) { console.log("Error in google strategy passport: ", err); return; }
                    return done(null, user)
                });
            }
    })
}
))
module.exports = passport;