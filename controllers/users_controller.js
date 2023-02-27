const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment')
const passport = require('../config/passport-local-strategy');
const { deserializeUser } = require('../config/passport-local-strategy');
const fs = require('fs');
const path = require('path')

//render the profile page
module.exports.profile = async function (req, res) {
    // User.findById(req.params.profileId, (err, user) => {
    //     return res.render('user_profile', {
    //         title: 'User Profile',
    //         user_profile: user
    //     })
    // })


    let user = await User.findById(req.params.profileId);
    return res.render('user_profile', {
        title: 'User Profile',
        user_profile: user
    })
}


// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

module.exports.updateform = function (req, res) {
    return res.render('updateform', {
        title: "Update"
    })
}
module.exports.update = async function (req, res) {
    // if (req.params.profileId == req.user.id) {
    //     User.findByIdAndUpdate(req.params.profileId, req.body, (err, user) => {
    //         if (err) { console.log("error in updating"); return; }
    //         req.flash('success', 'Profile updated')
    //         return res.redirect(`/users/profile/${req.params.profileId}/`)
    //     })
    // } else {
    //     req.flash('error', 'Unorthorized')
    //     return res.status(401).send("unauthorized")
    // }

    if (req.params.profileId == req.user.id) {
        try {
            let user = await User.findById(req.params.profileId);
            User.uploadedAvatar(req, res, function(err){
                if (err) { console.log("**********Multer error", err); }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    // if(user.avatar){
                    //     // User.updateOne({id: user.id},
                    //     //     { $unset: { avatar:"" } }
                    //     //  )
                    //    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    // }
                    user.avatar = User.avatarPath + '/' + req.file.filename
                }
                user.save();
           
                return res.redirect('back')
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
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
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
    /*
      User.findOne({ email: req.body.email }, function (err, user) {
          if (err) { console.log('error in finding user in signing up'); return }
  
          if (!user) {
              User.create(req.body, function (err, user) {
                  if (err) { console.log('error in creating user while signing up'); return }
  
                  return res.redirect('/users/sign-in');
              })
  
          } else {
              console.log(`${user} already availabale`);
              return res.redirect('back');
          }
  
      });
  
      */


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







module.exports.delete = async function (req, res) {


    try {
        let posts = await Post.find({ user: req.params.userId });
        console.log("_____________________________________________________________________________");
        console.log("Posts: ", posts)
        for (let postid of posts) {
            let postComment = await Comment.find({ post: postid._id });
            console.log("Post comment: ", postComment)
        }
        let comment = await Comment.find({ user: req.params.userId });
        console.log("comment: ", comment)
        console.log("_____________________________________________________________________________");

        return res.redirect('/')
    } catch {
        cosnole.log("Error: ", err);
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



