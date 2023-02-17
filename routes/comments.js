const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments_controller.js');
const passport = require('passport');


//post 

router.post('/create', passport.checkAuthentication ,commentsController.create);
router.get('/delete/:commentId', passport.checkAuthentication ,commentsController.delete);

module.exports = router;

