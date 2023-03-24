const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');
const commentsMailer = require('../mailer/comments_mailer')
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');


//craetes comments and stors in db
module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        
        if (post) {
            let comment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: post._id,
            })

            post.comments.push(comment);
            post.save();
            //populating the user from comment of the post 
            comment = await comment.populate('user', 'name email').execPopulate();
            // commentsMailer.newComment(comment);

            // let job = queue.create('emails', comment).save(function(err){
            //     if (err){
            //         console.log('Error in sending to the queue', err);
            //         return;
            //     }
            //     console.log('job enqueued', job.id);

            // })
            
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment,
                    },
                    message: "comment created"
                });
            }
        }
        req.flash('success', 'Comment created!')
        return res.redirect('back');
    } catch (err) {
        console.log("Error: ", err);
        return;
    }

}


//deletes the data 
module.exports.delete = async function (req, res) {

  

    try {
        let comment = await Comment.findById(req.params.commentId);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.commentId } })
             // CHANGE :: destroy the associated likes for this comment
             await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
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




