const passport = require('../middleware/authentication');
class usersController {
    formLogin(req, res){
        res.render('loguin');
    }
    login(req, res, next){
        passport.authenticate('login', function (err, user, info) {
            if(err) res.render('loguin', {error: err})
            if(user) res.render('main', {nombre: user.username});
            if(info) res.render('loguin', info)
        })(req, res, next);
    }
    logout(req, res){
        const userName = req.session.userName;
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
}

const usersCont = new usersController();

module.exports = usersCont;