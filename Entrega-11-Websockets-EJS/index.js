const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const http = require('http');
const io = require('socket.io');
const {Products, arrayProducts} = require('./classProducts');

const app = express();
const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const myServer = http.Server(app);
myServer.listen(port, () => console.log('Server up en puerto', port));

app.use('/api', apiRouter);
app.use('/', (req, res) => {
    res.render('form')
})

/* Server - WEBSOCKETS */
const myWSServer = io(myServer);

myWSServer.on('connection', (socket) => {
    const products = new Products();
    
    socket.on('getProducts', () => {
        socket.emit('productList', arrayProducts);
    })

    socket.on('create', (data) => {
        products.saveProduct(data.title, data.price, data.thumbnail, arrayProducts)

        myWSServer.emit('productList', arrayProducts);
    })

})


