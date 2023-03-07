const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'likes', 
                   
                },
                populate: {
                    path: 'user'
                },
               
            }).populate('likes');
            
        // console.log(posts[0])
        let users = await User.find({});
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users,

        });
    } catch (err) {
        console.log("Error: ", err);
        return;
    }


}

// module.exports.actionName = function(req, res){}

