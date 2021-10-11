
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
    registerUser(req, res){
        res.send('Estoy registrando al usuario')
    }
}

const usersCont = new usersController();

module.exports = usersCont;