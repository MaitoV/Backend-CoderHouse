const passport = require('../middleware/authentication');

const user = 'panchito';
const contrasena = 'panchirin21';

class usersController {
    formLogin(req, res){
        res.render('loguin');
    }
    login(req, res){
        const {nombre, password} = req.body;
        if(nombre === user && password == contrasena) {
            req.session.userName = nombre;
            res.render('main', {nombre: req.session.userName})
        } else res.render('loguin', {error: 'Las credenciales proporcionadas son invalidas'})
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
            console.log(err, user, info);
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