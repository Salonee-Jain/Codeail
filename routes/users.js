const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

//gets the profile page of users
router.get('/profile/:profileId',passport.checkAuthentication , usersController.profile);

//routers for signin singout and signup
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out', usersController.signOut);

//creates new user
router.post('/create', usersController.create);
//renders the update form
router.get('/updateform', passport.checkAuthentication ,usersController.updateform);
//updates the profile 
router.post('/update/:profileId', passport.checkAuthentication ,usersController.update);

//deletes the profile and associated posts and comments
router.get('/delete/:userId', passport.checkAuthentication ,usersController.delete)

//using passport as middleware here
router.post('/create-session',   passport.authenticate('local', { failureRedirect: '/users/sign-in' }),usersController.createSession);
router.get('/create_friend/:friendId', passport.checkAuthentication, usersController.createFriends );
router.get('/remove_friend/:friendId', passport.checkAuthentication, usersController.deleteFriends );
router.get('/remove_req/:friendId', passport.checkAuthentication, usersController.deleteReq );
router.get('/accept_req/:friendId', passport.checkAuthentication, usersController.acceptReq );
router.get('/message_friend/:friendId', passport.checkAuthentication, usersController.messageFriend );


router.get('/forget-password',usersController.forget );
router.post('/verify', usersController.verify);
router.get('/reset-pass/:userId', usersController.resetPass);
router.post('/confirm-reset/:userId', usersController.confirmReset);

router.get('/auth/google',   passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/auth/google/callback',   passport.authenticate('google', { failureRedirect: '/users/sign-in' }),usersController.createSession)



module.exports = router;

