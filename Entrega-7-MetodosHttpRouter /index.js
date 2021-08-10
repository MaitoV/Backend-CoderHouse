const express = require('express');
const {Products, arrayProducts }= require('./classProducts')

const app = express();
const port = 8080;

const server = app.listen(port, () => {
    console.log('Servidor arriba y corriendo');
})
server.on('error', (error) => console.log('Surgio un error ->', error) );
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const product = new Products();
app.get('/api/productos/listar', (req, res) => {
    const products = product.getProducts(arrayProducts);

    if(products.length == 0) {
        res.status(404).json({
            error: 'No hay productos cargados.'
        })
    } else res.status(200).json({ data: products})
})

app.get('/api/productos/listar/:id', (req, res) => {
    const findProduct = product.getProduct(req.params.id, arrayProducts);

    if(!findProduct) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
    } else res.status(200).json({ msg: findProduct})
})

//Para que el metodo post funcione bien y no llegue el req.body vacio hay que colocar en los headers de postman la siguiente key and value: Content-Type: application/json
app.post('/api/productos/guardar', (req, res) => {
    if(!req.body.title || !req.body.price || !req.body.thumbnail || typeof req.body.title != 'string' || typeof req.body.price != 'number' || typeof req.body.thumbnail != 'string'){
        res.status(400).json({
            error: 'La informacion ingresada es incorrecta intenta nuevamente'
        })
    } else {
        let newProduct = product.saveProduct(req.body.title, req.body.price, req.body.thumbnail, arrayProducts)
        res.status(201).json({
            data: newProduct
        })
    }
})

app.delete('/api/productos/eliminar/:id', (req, res) => {
    if(req.params.id > arrayProducts.length) {
        res.status(400).json({
            error: 'El producto que estas intentando eliminar no existe'
        })
    } else {
        const productDelete = product.deleteProduct(req.params.id);
        res.json({
            msg: 'El producto fue eliminado con exito',
            data: productDelete
        })
    }
})
