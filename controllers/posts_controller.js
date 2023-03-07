const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like');

//post the data and stors in db
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.posts,
            user: req.user._id,
        })
     

        // Post.uploadedPostpic(req, res, function(err){
        //     if(err){console.log(err)}
        //    console.log(req.file)
        // })
    

        ///populating the user from post
      
        
       
        
        if(req.xhr){
            post = await post.populate('user', 'name avatar').execPopulate();
            return res.status(200).json({
                data:{
                    //passing the populated one
                    post: post,
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
            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

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


