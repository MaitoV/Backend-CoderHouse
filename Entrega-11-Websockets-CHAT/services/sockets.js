const io = require('socket.io');
const {Products, arrayProducts} = require('../utils/classProducts.js');
const { addUser, getUsers, messageFormat } = require('../utils/chatUtils'); 

let initWebsocketServer = (httpServer) => {
    const WSServer = io(httpServer);
    WSServer.on('connection', (socket) => {
        console.log('Un nuevo cliente se conecto!');

        /* Websockets que controlan el chat */
        socket.on('initChat', (userData) => { //Socket que maneja el evento del ingreso de un nuevo usuario
            let usersArray = addUser(socket.client.id, userData);
            let message;
            //Emito un mensaje de bienvenida solo al usuario que se acaba de unir
            newMessage = messageFormat(undefined,`${userData}, bienvenido al chat!`)
            console.log(newMessage)
            socket.emit('welcome', newMessage);
            //Aviso a todos los usuarios conectados que se unio un nuevo usuario menos al que se acaba de unir
            newMessage = messageFormat(undefined, `${userData}! se unio al chat`)
            console.log(newMessage)
            socket.broadcast.emit('userJoin', newMessage);
            let usersOnline = getUsers();
            //Paso el listado actualizado de todos los usuarios
            socket.emit('getUsers', usersOnline);
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
