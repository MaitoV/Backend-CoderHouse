const productsOperations = require("../db/productsOperations");

class ProductsController {
    async getAll (req, res) {
        const products = await productsOperations.getAllProducts();
    
        if(products.length == 0) {
            res.status(404).json({
                error: 'No hay productos cargados.'
            })
        } else res.status(200).json({ data: products})
    }

    async getByID (req, res) {
        const {id} = req.params;
        const findProduct = await productsOperations.getProductByID(id)
    
        if(findProduct.length == 0) {
            res.status(404).json({
                error: 'Producto no encontrado'
            })
        } else res.status(200).json({ msg: findProduct})
    }

    async saveNewProduct (req, res) {
        const { title, price } = req.body;
        const thumbnail = req.file.filename; 
    
        if(!title || !price || !thumbnail|| typeof title != 'string' || typeof parseInt(price) != 'number'){
            res.status(400).json({
                error: 'La informacion ingresada es incorrecta intenta nuevamente'
            })
        } else {
            let newProduct = await productsOperations.addProduct(title, parseInt(price), thumbnail);
            res.status(201).json({
                msg: 'El producto se creo correctamente'
            })
        }
    }
}

const productsController = new ProductsController();

module.exports = productsController;