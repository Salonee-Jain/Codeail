const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments_controller.js');
const passport = require('passport');


//post 
router.post('/create' ,commentsController.create);

router.post('/createcomment', passport.checkAuthentication ,commentsController.create);
module.exports = router;
