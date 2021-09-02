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

    async saveNewProduct(req, res) {
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

    async updateProduct(req, res) {
        try {
            const {id} = req.params;
            await productsOperations.updateProduct(parseInt(id), req.body);
    
            res.status(201).json({
                msg: 'Producto actualizado correctamente'
            })
        } catch (error){
            res.status(404).json({
                error: error
            })
        }
    }

    async deleteProduct (req, res) {
        try {
         const {id} = req.params; 
     
         const productDelete = await productsOperations.delete(id);
          return res.json({
             msg: 'El producto fue eliminado con exito',
             data: productDelete
             }) 
     
         } catch (error) {
             res.status(404).json({
                 error: error
             })
         }
     
     }
}

const productsController = new ProductsController();

module.exports = productsController;