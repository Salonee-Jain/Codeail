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
    try {
        //if (post.user == req.user.id) {
            let p = post;
            post.remove();
            await Comment.deleteMany({ post: req.params.postId });
            


            
        // }else{
        //     return res.redirect('back')
        // }
        return res.status(200).json({
            message: "This post and comments",
            post: p,
        })
    } catch {

        return res.status(500).json({
            message: "Error occured while deleting post",
        });
    }
}
