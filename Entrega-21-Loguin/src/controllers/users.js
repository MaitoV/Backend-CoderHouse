const moment = require('moment');
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
            req.session.lastRequest = moment().format('hh:mm.ss');
            res.render('main', {nombre: req.session.userName})
        } else res.render('loguin', {error: 'Las credenciales proporcionadas son invalidas'})
    }
    logout(req, res){
        const userName = req.session.userName;
        req.session.destroy();
        res.render('logout', {nombre: userName});
    }
}

const usersCont = new usersController();

module.exports = usersCont;