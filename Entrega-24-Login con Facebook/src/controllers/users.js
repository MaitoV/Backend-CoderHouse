class usersController {
    formLogin(req, res){
        res.render('login');
    }
    logout(req, res){
        const userName = req.user.displayName;
        req.session.destroy();
        res.render('logout', {nombre: userName});
    }
    registerForm(req, res){
        res.render('register');
    }
    registerUser(req, res, next){
        passport.authenticate('signup', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) return res.render('register', {error: info})
            
            res.render('main', {nombre: user.username})
          })(req, res, next);
    }
    profile(req, res){
        const userData = req.user;
        const fullName = userData.displayName;
        const photo = userData.photos[0].value;
        const email = userData.emails[0].value;
        res.render('profile', {photo, email, fullName});
    }
}

const usersCont = new usersController();

module.exports = usersCont;