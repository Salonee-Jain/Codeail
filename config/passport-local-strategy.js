const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user || !user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

//serializing means extarcting unique thing and setting the cookie like userid

passport.serializeUser((user, done) => {
    done(null, user.id)
})




//desrializing is extarcting cookie and getting user oject from it
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        if(err){
            console.log("error getting user-----> passport");
            return done(err);
        }
        return done(null, user);
    })
})



module.exports = passport;