"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var _require = require('../utils/classProducts'),
    Products = _require.Products,
    arrayProducts = _require.arrayProducts;

var multer = require('multer');

var destinationFolder = 'public/uploads';
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, destinationFolder);
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
var product = new Products();
router.get('/productos/vista', function (req, res) {
  var productsArray = product.getProducts(arrayProducts);
  res.render('main', {
    productsArray: productsArray
  });
});
router.get('/productos/listar', function (req, res) {
  var products = product.getProducts(arrayProducts);

  if (products.length == 0) {
    res.status(404).json({
      error: 'No hay productos cargados.'
    });
  } else res.status(200).json({
    data: products
  });
});
router.get('/productos/listar/:id', function (req, res) {
  var findProduct = product.getProduct(req.params.id, arrayProducts);

  if (!findProduct) {
    res.status(404).json({
      error: 'Producto no encontrado'
    });
  } else res.status(200).json({
    msg: findProduct
  });
}); //Para que el metodo post funcione bien y no llegue el req.body vacio hay que colocar en los headers de postman la siguiente key and value: Content-Type: application/json

router.post('/productos/guardar', upload.single('thumbnail'), function (req, res) {
  if (!req.body.title || !req.body.price || !req.file || typeof req.body.title != 'string' || typeof parseInt(req.body.price) != 'number') {
    res.status(400).json({
      error: 'La informacion ingresada es incorrecta intenta nuevamente'
    });
  } else {
    var newProduct = product.saveProduct(req.body.title, req.body.price, req.file.filename, arrayProducts);
    res.redirect('/');
  }
});
router.put('/productos/actualizar/:id', function (req, res) {
  var productId = Number(req.params.id);
  var positionProduct = arrayProducts.map(function (aProduct) {
    return aProduct.id;
  }).indexOf(productId);

  if (positionProduct == -1) {
    res.status(400).json({
      error: 'El producto que estas intentado actualizar no existe'
    });
  } else {
    var updatedResult = product.updateProduct(positionProduct, req.body);
    res.status(201).json({
      data: updatedResult
    });
  }
});
router["delete"]('/productos/borrar/:id', function (req, res) {
  if (req.params.id > arrayProducts.length) {
    res.status(400).json({
      error: 'El producto que estas intentando eliminar no existe'
    });
  } else {
    var productDelete = product.deleteProduct(req.params.id);
    res.json({
      msg: 'El producto fue eliminado con exito',
      data: productDelete
    });
  }
});
module.exports = router;