const express = require('express')
const userRouter = express.Router();
const userCantroller = require('../controllers/user_controller')
userRouter.get('/', userCantroller.user)
userRouter.get('/userCreate', userCantroller.userCreate)
userRouter.get('/userDelete', userCantroller.userDelete)
userRouter.post('/userPost', userCantroller.userPost)
module.exports= userRouter

