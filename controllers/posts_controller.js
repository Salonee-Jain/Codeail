const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');
const { findById } = require('../models/user');

//post the data and stors in db
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.posts,
            user: req.user._id,
        })
     

        Post.uploadedPostpic(req, res, function(err){
            if(err){console.log(err)}
           console.log(req.file)
        })
    

        ///populating the user from post
        let mainpost = await Post.findById(post._id).populate('user')
        
       
        
        if(req.xhr){
            return res.status(200).json({
                data:{
                    //passing the populated one
                    post: mainpost,
                },
                message: "Post created"
            })
        }
        req.flash('success', 'Post created')
        return res.redirect('/');
    } catch(err) {
        console.log("Error: ", err)
    }
}





//delte the data 
module.exports.delete = async function (req, res) {

    let post = await Post.findById(req.params.postId);
    try {
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.postId });
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.postId,
                    },
                    message: "Post deleted"
                })
            }


            req.flash('success', 'Post and associated comments deleted')
        }else{
            return res.redirect('back')
        }
        return res.redirect('/')
    } catch {
        console.log("Error: ", err);
        return;
    }
}


