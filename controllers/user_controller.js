const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var userList = [];


module.exports.user = function (req, res, next) {
    res.render('user')
}
module.exports.userPost = function (req, res, next) {
    res.redirect('back')
 
}

module.exports.userCreate = function (req, res, next) {
    res.end(`<h1>Created user</h1>`)
}
module.exports.userDelete = function (req, res, next) {
    res.end(`<h1>User Deleted</h1>`)

}



