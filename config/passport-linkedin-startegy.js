const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/user')
const env = require('./environment')

console.log("github")

//https://github.com/settings/applications/2154554
try{
passport.use(new GitHubStrategy({
    clientID: env.githubClientID,
    clientSecret: env.githubClientSecret,
    callbackURL:env.githubCallbackURL, 
  },
  async function(accessToken, refreshToken, profile, done) {
    let user = await User.findOne({ email: profile.emails[0].value });
    console.log(profile)
        // console.log(profile._json.login);
        // console.log(profile._json.avatar_url);
        // console.log(profile._json.email)
        // user.name=profile._json.login;
        // user.email= profile._json.email;
        // user.password= crypto.randomBytes(20).toString('hex');
        // user.avatar= profile._json.avatar_url;
        // user.save();
        // return done(null, user)
        if (user) {
            return done(null, user)
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avatar: profile.photos[0].value,
            }, function (err, user) {
                if (err) { console.log("Error in github strategy passport: ", err); return; }
                return done(null, user)
            });
        }

        

  }
));
}catch(err){
    console.log(err);
    return;
}

module.exports = passport;