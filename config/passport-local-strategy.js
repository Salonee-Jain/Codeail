const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user')

passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user || user.password != password) { return done(null, false); }
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

//check user authentication 
passport.checkAuthentication = function(req, res, next){

    //this is is method that passport puts in req
    //if user is authenticated pass to the next cantroller function 
    if(req.isAuthenticated()){
        return next()
    }

    //if user is not signed in
    return res.redirect('/users/sign-in')

}



passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){

        //req.user has the current sigined in user this functionality is given by passport
        res.locals.user = req.user
    }
    next();
}




module.exports = passport;