const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');
const fs = require('fs');
const path = require('path')
const Chat = require('../models/chat')
const restMailer = require('../mailer/resetPassword_mailer');
const postController = require('./posts_controller');
const commentController = require('./comments_controller');
const Like = require('../models/like')


//render the profile page
module.exports.profile = async function (req, res) {

    let user = await User.findById(req.params.profileId);
    let chats = await Chat.find({});
    return res.render('user_profile', {
        title: 'User Profile',
        user_profile: user,
        chats: chats,
    })
}


// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeail | Sign Up"
    })
}

module.exports.updateform = async function (req, res) {
    let chats = await Chat.find({});
    return res.render('updateform', {
        title: "Update",
        chats: chats,
    })
}
module.exports.update = async function (req, res) {


    if (req.params.profileId == req.user.id) {
        try {
            let user = await User.findById(req.params.profileId);
            User.uploadedAvatar(req, res, function (err) {
                console.log(req.file)
                if (err) { console.log("**********Multer error", err); }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if (user.avatar) {
                        if (fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                        }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;

                }
                user.save();
                req.flash('success', 'Profile updated')
                return res.redirect('/');
            })


        } catch (err) {
            req.flash('error: ', err)
            return res.redirect('back')
        }


    } else {
        req.flash('error', 'Unorthorized')
        return res.status(401).send("unauthorized")
    }
}





// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        console.log("already signed in")
        return res.redirect('/users/profile')
    }
    // console.log("signed in")
    return res.render('user_sign_in', {
        title: "Codeail | Sign In"
    })
}


//signout has become asynchronus so must have a callback function with it
module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out succesfully')
        return res.redirect('/')
    });


}
// get the sign up data
module.exports.create = async function (req, res) {
    if (req.isAuthenticated()) {
        req.flash('error', "already signed in")
        return res.redirect('/users/profile')
    }
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', "passwords do not match")
        return res.redirect('back');
    }


    try {
        user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (!user) {
            await User.create(req.body);
            req.flash('success', "user created")
            return res.redirect('/users/sign-in');
        } else {
            req.flash('error', "There is an another user with same email")
            return res.redirect('back');
        }

    } catch (err) {
        req.flash('error', "Error in creating user")
        console.log("Error: ", err);
        return;
    }


}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in successfully')
    return res.redirect('/')
}



module.exports.createFriends = async function (req, res) {
    if (!(req.user.sent.includes(req.params.friendId))) {
        let upda = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { sent: req.params.friendId } });
    }
    let updb = await User.findOne({ _id: req.params.friendId });
    if (!(updb.pending.includes(req.user.id))) {
        updb.pending.push(req.user.id);
        updb.save();
    }
    return res.redirect('back')

}
module.exports.deleteReq = async function (req, res) {
    if (req.user.sent.includes(req.params.friendId)) {
        let upda = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { sent: req.params.friendId } });
    }
    let updb = await User.findOne({ _id: req.params.friendId });
    if ((updb.pending.includes(req.user.id))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { pending: req.user.id } });
    }
    return res.redirect('back')
}


module.exports.acceptReq = async function (req, res) {
    let updb = await User.findOne({ _id: req.params.friendId });
    if (req.user.pending.includes(req.params.friendId) && updb.sent.includes(req.user.id)) {
        await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { pending: req.params.friendId } });
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { sent: req.user.id } });
    }
    if (!(updb.friendships.includes(req.user.id)) && !(req.user.friendships.includes(req.params.friendId))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $push: { friendships: req.user.id } });
        await User.findOneAndUpdate({ _id: req.user.id }, { $push: { friendships: req.params.friendId } });
    }
    return res.redirect('back')
}


module.exports.deleteFriends = async function (req, res) {
    let updb = await User.findOne({ _id: req.params.friendId });
    if ((updb.friendships.includes(req.user.id)) && (req.user.friendships.includes(req.params.friendId))) {
        await User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { friendships: req.user.id } });
        await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { friendships: req.params.friendId } });
    }
    return res.redirect('back')
}


module.exports.messageFriend = async function (req, res) {
    let messagefriend = await User.findById(req.params.friendId);
    if (req.xhr) {
        console.log(messagefriend)
        return res.status(200).json({
            user: messagefriend.email,
            message:"User found",
        },
       
        )
    }else{
        return res.status(400).json({
            message:"User not found",
        })
    }
}




module.exports.forget = async function (req, res) {

    return res.render('verifymail', {
        title: "Verify email"
    })
}

module.exports.verify = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (user) {
        req.flash('success', 'Rest link has been sent to your email id')
        restMailer.newReset(user)
        return res.render('verified', {
            title: "verifid"
        })
    } else {
        req.flash('error', 'Enter your registered email id')
        return res.redirect('back')
    }

}
module.exports.resetPass = async function (req, res) {
    console.log(req.params.userId)
    return res.render('resetform', {
        title: "Reset password",
        resuser: req.params.userId,
    })

}
module.exports.confirmReset = async function (req, res) {
    let user = await User.findByIdAndUpdate(req.params.userId, { password: req.body.password });
    req.flash('success', 'Password has been reset')
    return res.redirect('/users/sign-in')

}





module.exports.delete = async function (req, res) {


    try {
        let posts = await Post.find({ user: req.params.userId });
        console.log("_____________________________________________________________________________");
        for (let postid of posts) {
            console.log(postid._id)
            // let postdel = await Post.deleteMany({_id: postid._id});
        }
        
        console.log("_____________________________________________________________________________");
        let comments = await Comment.find({ user: req.params.userId });
        for (let commentid of comments) {
            console.log(commentid._id)
            // let postdel = await Post.deleteMany({_id: postid._id});
        }
       
        console.log("_____________________________________________________________________________");
        let likes = await Like.find({ user: req.params.userId });
        for (let likeid of likes) {
            console.log(likeid._id)
            // let postdel = await Post.deleteMany({_id: postid._id});
        }
        return res.redirect('/')
    } catch {
        console.log("Error: ", err);
        return;
    }

}



























































// module.exports.delete = function (req, res) {


//     Post.find({ user: req.user.id }, (err, post) => {
//         if (err) { console.log("error in deleting post of main user"); return; }
//         if (post) {
//             for(let comments of post){
//                 for(let comment of comments.comments){
//                     Comment.findById(comment,(err, comment)=>{
//                         if(err){console.log("error in deleting comments of main user posts"); return;}
//                         console.log(comment)
//                     } )
//                 }

//             }
//             post.remove()
//         }
//     })
//     Comment.find({ user: req.user.id }, (err, comment) => {
//         if (err) { console.log("error in updating"); return; }
//        comment.remove();
//     })



//     User.findById(req.user.id, (err, user) => {
//         if (err) { console.log("error in deleting user"); return; }
//         user.remove();
//     })

//     return res.end("delete")
// }



