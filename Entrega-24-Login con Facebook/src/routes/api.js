const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const usersController = require('../controllers/users');
const passport = require('../middlewares/authentication');
const isLoggedIn = require('../middlewares/checkLogin');

router.get('/productos/listar', productsController.getAll);
router.get('/productos/listar/:id', productsController.getByID);
router.post('/productos/guardar', productsController.saveNewProduct);
router.put('/productos/actualizar/:id', productsController.updateProduct);
router.delete('/productos/borrar/:id', productsController.deleteProduct);


router.get('/productos/vista-test', productsController.get);
router.post('/productos/vista-test', productsController.generate);


router.get('/users/login', usersController.formLogin);
router.get('/users/auth/facebook', passport.authenticate('facebook', {scope: ['email']}) );
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/api/users/profile',
    failureRedirect: '/api/users/login',
  }));
router.get('/users/profile', isLoggedIn, usersController.profile);
router.get('/users/logout', usersController.logout);
router.get('/users/register', usersController.registerForm);
router.post('/users/register', usersController.registerUser);


module.exports = router;

