const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');
const { findById } = require('../models/user');

//post the data and stors in db
module.exports.create = async function (req, res) {
    try {
        await Post.create({
            content: req.body.posts,
            user: req.user._id,
        })
        return res.redirect('/');
    } catch {
        cosnole.log("Error: ", err)
    }
}



//delte the data 
module.exports.delete = async function (req, res) {
    /*
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
    */

    let post = await Post.findById(req.params.postId);
    try {
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.postId })
        }
        return res.redirect('/')
    } catch {
        cosnole.log("Error: ", err);
        return;
    }
}
