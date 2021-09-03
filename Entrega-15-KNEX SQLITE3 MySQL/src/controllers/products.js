const productsOperations = require("../db/productsOperations");

class ProductsController {
    async getAll (req, res) {
        try {
            const products = await productsOperations.getAllProducts();
            res.status(200).json({ data: products})
        } catch (error) {
            res.json({
                error: error
            })
        }
    }

    async getByID (req, res) {
        try {
            const {id} = req.params;
            const findProduct = await productsOperations.getProductByID(id)
            res.status(200).json({
                msg: findProduct
            })
        } catch (error) {
            res.status(404).json({
                error: error
            })
        }
    } 

    async saveNewProduct(req, res) {
        try {
          const { title, price } = req.body;
            const thumbnail = req.file.filename; 
            
            let newProduct = await productsOperations.addProduct(title, parseInt(price), thumbnail);
            res.status(201).json({
                msg: 'El producto se creo con exito!'
            })
        } catch (error) {
            res.status(400).json({
                error: error
            })
        }
    }

    async updateProduct(req, res) {
        try {
            const {id} = req.params;
            await productsOperations.updateProduct(parseInt(id), req.body);
    
            res.status(201).json({
                msg: 'Producto actualizado con exito!'
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