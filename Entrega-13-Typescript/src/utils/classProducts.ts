class Products {
    id: number;
    title: string;
    price: number;
    thumbnail: string;

    constructor(title:string, price:number, thumbnail:string, arrayLength:number) {
        this.id = arrayLength + 1;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail
    }
    getProducts(array:any) {
        return array;
    }
    getProduct(id:number, array:any) {
        return array.find((aProduct:any) => aProduct.id == id)
    }
    saveProduct(title:string, price:number, thumbnail:string, array:any){
            let newProduct = new Products(title, price, thumbnail, array.length);
            array.push(newProduct)
            return newProduct;
    }
    updateProduct(position:any, updateInformation:any) {
        arrayProducts[position].title = updateInformation.title,
        arrayProducts[position].price = updateInformation.price
        return arrayProducts[position]
    }
    deleteProduct(id:number){
        arrayProducts = arrayProducts.filter((aProduct) => aProduct.id != id)
        return arrayProducts;
    }
}

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
]

export {Products, arrayProducts};
