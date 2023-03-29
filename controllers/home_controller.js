const Comment = require('../models/comment')
const Post = require('../models/post');
const User = require('../models/user');
const Chat = require('../models/chat')

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
        let chats = await Chat.find({});
        // console.log(chats)
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users,
            chats: chats,

        });
    } catch (err) {
        console.log("Error: ", err);
        return;
    }


}

module.exports.chat=(req, res)=>{
    return res.render('_chatengine',{
        title: "chatbox"
    })
}

// module.exports.actionName = function(req, res){}

