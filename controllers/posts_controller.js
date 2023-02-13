const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');

//post the data and stors in db
module.exports.create = function(req, res){
    
        Post.create({
            content: req.body.posts,
            user: req.user._id,

        }, function(err, user){
            if(err){console.log('error in creating post'); return}

            return res.redirect('/');
        })
    }

   



module.exports.createcomment = function(req, res){
    console.log(req)
    res.end('coment')
    // if(req.isAuthenticated()){
    //     console.log(req)
    //     Comment.create({
    //         content: req.body.comment,
    //         user: req.user,
            

    //     }, function(err, user){
    //         if(err){console.log('error in creating post'); return}

    //         return res.redirect('/');
    //     })
    // }else{
    //     return res.redirect('/users/sign-in');
    // }

   

}