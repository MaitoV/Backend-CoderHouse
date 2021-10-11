const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/products');
const usersController = require('../controllers/users');
const passport = require('../middleware/authentication');


const destinationFolder = 'public/uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, destinationFolder)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage})

router.get('/productos/listar', productsController.getAll);

router.get('/productos/listar/:id', productsController.getByID);

//Para que el metodo post funcione bien y no llegue el req.body vacio hay que colocar en los headers de postman la siguiente key and value: Content-Type: application/json
router.post('/productos/guardar', upload.single('thumbnail'), productsController.saveNewProduct);

router.put('/productos/actualizar/:id', productsController.updateProduct);

router.delete('/productos/borrar/:id', productsController.deleteProduct);


router.get('/productos/vista-test', productsController.get);
router.post('/productos/vista-test', productsController.generate);


router.get('/users/login', usersController.formLogin);
router.post('/users/login', usersController.login);
router.post('/users/logout', usersController.logout);
router.get('/users/register', usersController.registerForm);
router.post('/users/register', passport.authenticate('signup'), usersController.registerUser);


module.exports = router;

