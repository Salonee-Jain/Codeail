const Post = require('../models/post')

module.exports.home = function(req, res){
   
    Post.find({}).populate('user').exec((err, post)=>{
        if(err){console.log('Error in fetching post')}
        return res.render('home', {
            title: "Home",
            post: post,
        });
    })
   
}

// module.exports.actionName = function(req, res){}

