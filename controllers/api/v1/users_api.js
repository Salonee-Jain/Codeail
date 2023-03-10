const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});
        if (!user || user.password != req.body.password){
           
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }else{
            return res.status(200).json({
                message: 'Sign in successful, here is your token, please keep it safe!',
                data:  {
                    token: jwt.sign(user.toJSON(), 'codeail', {expiresIn:  '100000'})
                }
            })
        }

      

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}