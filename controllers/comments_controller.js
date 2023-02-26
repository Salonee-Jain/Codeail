const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');

//craetes comments and stors in db
module.exports.create = async function (req, res) {

    /*Post.findById(req.body.post, (err, post) => {
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
    })*/
    try {
        let post = await Post.findById(req.body.post);
        
        if (post) {
            let comment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: post._id,
            })

            
            //populating the user from comment of the post 
            let maincomment = await Comment.findById(comment._id).populate('user')
            console.log(maincomment)
           
            req.flash('success', 'Comment created!')
            post.comments.push(comment);
            post.save();
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: maincomment,
                    },
                    message: "comment created"
                });
            }
        }

        return res.redirect('back');
    } catch (err) {
        console.log("Error: ", err);
        return;
    }

}


//deletes the data 
module.exports.delete = async function (req, res) {

    /*Comment.findById(req.params.commentId, function (err, comment) {
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.commentId } }, (err, post) => {
                return res.redirect('/')
            }
            )

        } else {
            return res.redirect('/')

        }
    });*/

    try {
        let comment = await Comment.findById(req.params.commentId);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.commentId } })
            
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id: req.params.commentId,
                    },
                    message: "Comment deleted"
                })
            }
            req.flash('success', 'Comment deleted')
        }
        return res.redirect('/')

    } catch (err) {
        cosnole.log("Error: ", err);
        return;
    }

}




