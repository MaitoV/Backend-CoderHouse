class Products {
    constructor(title, price, thumbnail, arrayLength) {
        this.id = arrayLength + 1;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail
    }
    updateProduct(position, updateInformation) {
        arrayProducts[position].title = updateInformation.title,
        arrayProducts[position].price = updateInformation.price
        return arrayProducts[position]
    }

}

module.exports = {
    Products,
}