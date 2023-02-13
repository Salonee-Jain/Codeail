const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');

//post the data and stors in db
module.exports.create = function (req, res) {

    Post.findById(req.body.post, (err, post) => {
        if (post){

        Comment.create({
            content: req.body.comment,
            user: req.user._id,
            post: post._id,

        }, function(err, comment){
            // if(err){console.log('error in creating comment'); return}
            post.comments.push(comment);
            //whenever we upadte something we have save it
            post.save();
            return res.redirect('/');
        })
    }



    })
}





