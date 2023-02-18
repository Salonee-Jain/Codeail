const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function (req, res) {
    /*
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
        */

    //will do it using promises

    try {
        let posts = await Post.find({})
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home', {
            title: "Home",
            posts: posts.reverse(),
            all_users: users,

        });
    } catch (err) {
        cosnole.log("Error: ", err);
        return;
    }


}

// module.exports.actionName = function(req, res){}

