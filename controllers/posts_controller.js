const User = require('../models/user');
const Post = require('../models/post')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');

//post the data and stors in db
module.exports.create = function(req, res){
    
    if(req.isAuthenticated()){
    
        Post.create({
            content: req.body.posts,
            user: req.user,

        }, function(err, user){
            if(err){console.log('error in creating post'); return}

            return res.redirect('/');
        })
    }else{
        return res.redirect('/users/sign-in');
    }

   

}