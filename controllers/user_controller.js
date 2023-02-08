var userList = [];


module.exports.user = function (req, res, next) {
    res.render('user')
}
module.exports.userPost = function (req, res, next) {
    // userList.push(req.body)
    // res.redirect('/user', { userlist : userList});
    console.log(req)
    res.end("req.body.fname")
}

module.exports.userCreate = function (req, res, next) {
    res.end(`<h1>Created user</h1>`)
}
module.exports.userDelete = function (req, res, next) {
    res.end(`<h1>User Deleted</h1>`)

}



