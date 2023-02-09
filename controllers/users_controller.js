const User = require('../models/user');


module.exports.profile = function (req, res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, (err, users) => {
            if (err) {return redirect('/users/sign-in')}
            if (users) {
                console.log(users)
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: users
                })
            }else{
                return redirect('/users/sign-in')
            }
        })
    }else{
        return redirect('/users/sign-in')
    }


  


}



// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

//signout functionality
module.exports.signOut = function (req, res) {
    res.clearCookie("user_id");
    return res.redirect('./sign-in')
}



// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

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
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("err in finding user in signing in");
            return;
        }
        if (user) {
            if (user.password == req.body.password) {
                res.cookie('user_id', user.id)
                return res.redirect('/users/profile')

            } else {
                console.log("wrong password")
                return res.redirect('back')
            }
        } else {

            return res.redirect('./sign-up')
        }
    }
    )
}