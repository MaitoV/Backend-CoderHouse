const checkLogin = (req, res, next) => {
    if(req.session.userName) next();
    else res.redirect('/api/users/login');
}

module.exports = checkLogin;