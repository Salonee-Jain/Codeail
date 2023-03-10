const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts_controller');
const passport = require('passport');


//post 
router.post('/create' ,passport.checkAuthentication,postsController.create);
router.get('/delete/:postId' ,passport.checkAuthentication,postsController.delete);
module.exports = router;

