const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = function(req, res){
 


    
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    .exec((err, posts)=>{
        if(err){console.log("error")}
        posts.reverse();
        User.find({}, (err, users) => {
            if (err) { console.log("error") }
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users,

            });
        })
    });

   
}

// module.exports.actionName = function(req, res){}

