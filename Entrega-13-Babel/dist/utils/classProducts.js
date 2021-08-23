"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Products = /*#__PURE__*/function () {
  function Products(title, price, thumbnail, arrayLength) {
    _classCallCheck(this, Products);

    this.id = arrayLength + 1;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  _createClass(Products, [{
    key: "getProducts",
    value: function getProducts(array) {
      return array;
    }
  }, {
    key: "getProduct",
    value: function getProduct(id, array) {
      return array.find(function (aProduct) {
        return aProduct.id == id;
      });
    }
  }, {
    key: "saveProduct",
    value: function saveProduct(title, price, thumbnail, array) {
      var newProduct = new Products(title, price, thumbnail, array.length);
      array.push(newProduct);
      return newProduct;
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(position, updateInformation) {
      arrayProducts[position].title = updateInformation.title, arrayProducts[position].price = updateInformation.price;
      return arrayProducts[position];
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(id) {
      arrayProducts = arrayProducts.filter(function (aProduct) {
        return aProduct.id != id;
      });
      return arrayProducts;
    }
  }]);

  return Products;
}();

var arrayProducts = [{
  id: 1,
  title: 'Lapicera',
  price: 75.60,
  thumbnail: 'https://www.bikabik.com.ar/wp-content/uploads/2020/07/lapicera-bic-trazo-fino1-71ebc33f028281085915864477484945-640-0-min.jpg'
}, {
  id: 2,
  title: 'Cartuchera',
  price: 590.60,
  thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/822/270/products/aliens21-1bebf4f1f2a6f4501c15844666646646-640-0.png'
}, {
  id: 3,
  title: 'Taza',
  price: 750,
  thumbnail: 'https://m.media-amazon.com/images/I/41gdpnvdSQL._AC_SX425_.jpg'
}];
module.exports = {
  Products: Products,
  arrayProducts: arrayProducts
};