const user = 'panchito';
const contrasena = 'panchirin21';

class usersController {
    formLogin(req, res){
        res.render('loguin');
    }
    login(req, res){
        const {nombre, password} = req.body;
        if(nombre === user && password == contrasena) res.render('main', {nombre: user})
        else res.send('Credenciales invalidas')
    }
}

const usersCont = new usersController();

module.exports = usersCont;