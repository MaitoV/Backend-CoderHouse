const fs = require('fs/promises');
const productsModel = require('./models/productos');
const mongoose = require('mongoose');

class ProductsOperations {
    
   async getAllProducts() {
       try {
            const productsList = await productsModel.find({}).sort({title: 1})

            if(productsList.length == 0) throw('No hay productos cargados.')

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getProductByID(productID) {
        try {
            const getProduct = await productsModel.findById(productID);

            if(getProduct.length == 0) throw('El producto solicitado no existe');

            return getProduct;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(title, price, thumbnail) {
        try {
            if(!title || !price || !thumbnail|| typeof title != 'string' || typeof parseInt(price) != 'number') {
                throw('La informacion ingresada es incorrecta, intenta nuevamente')
            }
            let newProduct = {
                _id: new mongoose.Types.ObjectId().toHexString(),
                title: title,
                price: price,
                thumbnail: thumbnail
            };
            const addProduct = await productsModel.create(newProduct);
            return addProduct;
        } catch (error) {
            throw error
        }

    }

    async delete(ItemID) {
        try {
            const findProduct = await this.getProductByID(ItemID);

            await productsModel.deleteOne({_id: ItemID});

            await fs.unlink(`public/uploads/${findProduct.thumbnail}`);

        } catch (error) {
            throw error;
        }
    }

    async updateProduct(itemID, newInfo) {
        try {
            const update = await productsModel.findOneAndUpdate({_id: itemID}, newInfo, {new: true});
            if(!update) throw('El producto que estas intentando editar no existe ')
            return update;
        } catch (error) {
            throw error;
        }
    }
}

const productsOperations = new ProductsOperations();

module.exports = productsOperations;