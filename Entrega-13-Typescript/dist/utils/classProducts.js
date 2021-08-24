"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayProducts = exports.Products = void 0;
class Products {
    constructor(title, price, thumbnail, arrayLength) {
        this.id = arrayLength + 1;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
    getProducts(array) {
        return array;
    }
    getProduct(id, array) {
        return array.find((aProduct) => aProduct.id == id);
    }
    saveProduct(title, price, thumbnail, array) {
        let newProduct = new Products(title, price, thumbnail, array.length);
        array.push(newProduct);
        return newProduct;
    }
    updateProduct(position, updateInformation) {
        arrayProducts[position].title = updateInformation.title,
            arrayProducts[position].price = updateInformation.price;
        return arrayProducts[position];
    }
    deleteProduct(id) {
        exports.arrayProducts = arrayProducts = arrayProducts.filter((aProduct) => aProduct.id != id);
        return arrayProducts;
    }
}
exports.Products = Products;
let arrayProducts = [
    {
        id: 1,
        title: 'Lapicera',
        price: 75.60,
        thumbnail: 'https://www.bikabik.com.ar/wp-content/uploads/2020/07/lapicera-bic-trazo-fino1-71ebc33f028281085915864477484945-640-0-min.jpg'
    },
    {
        id: 2,
        title: 'Cartuchera',
        price: 590.60,
        thumbnail: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/822/270/products/aliens21-1bebf4f1f2a6f4501c15844666646646-640-0.png'
    },
    {
        id: 3,
        title: 'Taza',
        price: 750,
        thumbnail: 'https://m.media-amazon.com/images/I/41gdpnvdSQL._AC_SX425_.jpg'
    }
];
exports.arrayProducts = arrayProducts;
