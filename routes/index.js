const express = require('express')
const router = express.Router();  
const homeCantroller = require('../controllers/home_controller')
const userRouter = require('./users')

router.get('/', homeCantroller.home)
router.get('/about',homeCantroller.about)

router.use('/user', userRouter)
//for further routes
//router.use('/path', require("routerfile"))

module.exports= router

