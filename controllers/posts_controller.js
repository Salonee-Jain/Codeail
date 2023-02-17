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

   

//delte the data 
module.exports.delete = function(req, res){
    // Post.findByIdAndRemove(req.params.postId, function (err, post) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Removed post : ", post);
    //     }
    // });

    Post.findById(req.params.postId, function (err, post) {
        if(err){console.log("error in deleting post"); return;}
            if(post.user==req.user.id){
                post.remove();
                Comment.deleteMany({post: req.params.postId, function(err, comment){
                    if(err){console.log("error in deleting commments of post"); return;}
                }})
            }
        });

    return res.redirect('/')
}
