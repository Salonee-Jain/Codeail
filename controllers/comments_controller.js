const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');

//craetes comments and stors in db
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


//deletes the data 
module.exports.delete = function(req, res){
    //in this method the comment must b also removed from the post.comment array list
    
    // Comment.findByIdAndRemove(req.params.commentId, function (err, comment) {
    //     if (err){
    //         console.log(err)
    //     }
    //     else{
    //         console.log("Removed comment: ", comment);
    //     }
    // });
    Comment.findById(req.params.commentId, function (err, comment) {
           if(comment.user==req.user.id){
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.commentId}}, (err, post)=>{
                return res.redirect('/')
            }
            )
           
           }else{
            return res.redirect('/')
        
           }
        });

    }




