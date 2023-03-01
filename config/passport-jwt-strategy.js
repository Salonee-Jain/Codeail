const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

//this is the key used to encrypt the accessToken
let opts = {jwtFromRequest:  ExtractJWT.fromAuthHeaderAsBearerToken ,secretOrKey : 'codeail'}


//JWT has three parts eparted by dots
//Header.payload.signature
//payload: contains info of usr
passport.use(new JwtStrategy(opts, function(jwtPayload, done) {
    User.findById(jwtPayload._id, function(err, user) {
        if (err) {
            console.log("error in JWT")
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


module.exports = passport;