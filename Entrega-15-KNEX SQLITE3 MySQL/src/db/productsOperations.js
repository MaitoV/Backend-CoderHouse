const fs = require('fs/promises');
const { mysqlDB } = require('./db');

class ProductsOperations {
    
   async getAllProducts() {
       try {
            const productsList = await mysqlDB.from('products').select();

            if(productsList.length == 0) throw('No hay productos cargados.')

            return productsList;
       } catch(error) {
            throw error;
       }
    }

    async getProductByID(productID) {
        try {
            const getProduct = await mysqlDB.from('products').where({id: productID});

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
            const addNewProduct = await mysqlDB.from('products').insert({
                title: title,
                price: price,
                thumbnail: thumbnail
            });
        } catch (error) {
            throw error
        }

    }

    async delete(ItemID) {
        try {
            const findProduct = await this.getProductByID(ItemID);

            await mysqlDB('products').where({id: ItemID}).del();

            await fs.unlink(`public/uploads/${findProduct[0].thumbnail}`);

        } catch (error) {
            throw error;
        }
    }

    async updateProduct(itemID, newInfo) {
        //Actualizar foto tambien
        try {
            const update = await mysqlDB('products').where({id: itemID}).update(newInfo);
            if(!update) throw('El producto que estas intentando editar no existe ')
            return update;
        } catch (error) {
            throw error;
        }
    }
}

const productsOperations = new ProductsOperations();

module.exports = productsOperations;