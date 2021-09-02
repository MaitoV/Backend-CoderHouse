const fs = require('fs/promises');
const { mysqlDB } = require('./db');

class ProductsOperations {
    
   async getAllProducts() {
            const productsList = await mysqlDB.from('products').select();
            return productsList;
    }

    async getProductByID(productID) {
        const getProduct = await mysqlDB.from('products').where({id: productID});
        return getProduct;
    }

    async addProduct(title, price, thumbnail) {
        const addNewProduct = await mysqlDB.from('products').insert({
            title: title,
            price: price,
            thumbnail: thumbnail
        });
        return addNewProduct;
    }

    async delete(ItemID) {
        try {
            const findProduct = await this.getProductByID(ItemID);
            if(findProduct.length == 0) {
                throw ('El producto que estas intentando eliminar no existe')
            }

            await fs.unlink(`public/uploads/${findProduct[0].thumbnail}`);

            await mysqlDB('products').where({id: ItemID}).del();
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