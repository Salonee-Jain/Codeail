const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.home = function(req, res){
   
    Post.find({}).populate('user').populate('comments').exec((err, post)=>{
        console.log(post)
        return res.render('home', {
            title: "Home",
            post: post,
        
        });
    })
   
}

// module.exports.actionName = function(req, res){}

