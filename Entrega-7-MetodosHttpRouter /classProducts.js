class Products {
    constructor(title, price, thumbnail, arrayLength) {
        this.id = arrayLength + 1;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail
    }
    getProducts(array) {
        return array;
    }
    getProduct(id, array) {
        return array.find((aProduct) => aProduct.id == id)
    }
    saveProduct(title, price, thumbnail, array){
            let newProduct = new Products(title, price, thumbnail, array.length);
            array.push(newProduct)
            return newProduct;
    }
    deleteProduct(id){
        arrayProducts = arrayProducts.filter((aProduct) => aProduct.id != id)
        return arrayProducts;
    }
}

let arrayProducts = [
    {
        id: 1,
        title: 'lapicera',
        price: 75.60,
        thumbnail: 'http://www.photo1.com'
    },
    {
        id: 2,
        title: 'Cartuchera',
        price: 590.60,
        thumbnail: 'http://www.photo2.com'
    }
]

module.exports = {
    Products,
    arrayProducts,
}