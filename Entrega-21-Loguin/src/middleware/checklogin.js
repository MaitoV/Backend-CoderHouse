const checkLogin = (req, res, next) => {
    if(req.session) next();
    else res.redirect('/api/users/login');
}

module.exports = checkLogin;