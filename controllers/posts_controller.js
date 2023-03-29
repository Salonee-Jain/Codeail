const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like');
const fs = require('fs');
const path = require('path')
//post the data and stors in db
module.exports.create = async function (req, res) {
    try {
     
        Post.uploadedPostpic(req, res, async function(err){
          console.log(req.body)
            if(err){console.log(err)}
            let post = await Post.create({
                content: req.body.posts,
                user: req.user._id,
            })
    
          if(req.file){
                 
            post.postpic = await Post.postPicPath + '/' + req.file.filename;
            post.save();
         
          }
            
            if(req.xhr){
                post = await post.populate('user', 'name avatar').execPopulate();
                return res.status(200).json({
                    data:{
                        //passing the populated one
                        post: post,
                        img: req.file,
                    },
                    message: "Post created"
                })
            }
            
        req.flash('success', 'Post created')
        return res.redirect('/');
        })
    

      

      
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

            if ((__dirname, '..', post.postpic)!=undefined && fs.existsSync(path.join(__dirname, '..', post.postpic))) {
                fs.unlinkSync(path.join(__dirname, '..', post.postpic));
            }
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
    } catch(err) {
        console.log("Error: ", err);
        return;
    }
}


