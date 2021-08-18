const io = require('socket.io');
const {Products, arrayProducts} = require('../utils/classProducts.js');
const { addUser } = require('../utils/chatUtils'); 

let initWebsocketServer = (httpServer) => {
    const WSServer = io(httpServer);
    WSServer.on('connection', (socket) => {
        console.log('Un nuevo cliente se conecto!');

        /* Websockets que controlan el chat */
        socket.on('initChat', (userData) => { //Socket que maneja el evento del ingreso de un nuevo usuario
            let usersArray = addUser(socket.client.id, userData);
            const welcomeMessage = 'Bienvenido al chat!'
            socket.emit('welcome', welcomeMessage);
            WSServer.emit('getUsers', usersArray);
        })

        /* Websockets que controlan la creacion y actualizacion de los productos */
        const products = new Products();
        
        socket.on('getProducts', () => {
            socket.emit('productList', arrayProducts);
        })

        socket.on('create', (data) => {
            products.saveProduct(data.title, data.price, data.thumbnail, arrayProducts)

            myWSServer.emit('productList', arrayProducts);
        })

        socket.on('initChat', (userEmail) => {
            console.log('Un nuevo usuario inicializo el chat!')

        })

    })

    return WSServer;
}

module.exports = initWebsocketServer;
