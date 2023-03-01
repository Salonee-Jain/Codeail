const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function(req, res){
    let posts = await Post.find({})
        .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
    return res.json(200, {
        message:"List of posts",
        posts: posts,
    })
}

module.exports.delete = async function (req, res) {
   
    let post = await Post.findById(req.params.postId);
   console.log((post.user == req.user.id))
    try {
        if (post.user == req.user.id) {
        var p = post;
           console.log('try if')
            post.remove();
            await Comment.deleteMany({ post: req.params.postId });
        }
        else{
            console.log('try else')
            return res.status(500).json({
                message: "not authorized to delete"
            })
        }
        return res.status(200).json({
            message: "This post and comments",
            post: p,
        })
    } catch {

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
