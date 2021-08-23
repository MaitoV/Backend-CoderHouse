const io = require('socket.io');
const {Products, arrayProducts} = require('../utils/classProducts.js');
const { addUser, getUsers, messageFormat, findUser, getRandomAvatar } = require('../utils/chatUtils.js'); 

let initWebsocketServer = (httpServer) => {
    const WSServer = io(httpServer);
    WSServer.on('connection', (socket) => {
        let message;
        console.log('Un nuevo cliente se conecto!');

        /* Websockets que controlan el chat */
        socket.on('initChat', (userEmail) => { 
            //Elegimos un avatar random
            let newAvatar = getRandomAvatar();
            //Socket que maneja el evento del ingreso de un nuevo usuario
            addUser(socket.client.id, userEmail, newAvatar);
            //Emito un mensaje de bienvenida solo al usuario que se acaba de unir
            newMessage = messageFormat(undefined,`${userEmail}, bienvenido al chat!`)
            socket.emit('welcome', newMessage);
            //Aviso a todos los usuarios conectados que se unio un nuevo usuario menos al que se acaba de unir
            newMessage = messageFormat(undefined, `${userEmail}! se unio al chat`)
            socket.broadcast.emit('userJoin', newMessage);
           let usersOnline = getUsers();
            //Paso el listado actualizado de todos los usuarios
            WSServer.emit('getUsers', usersOnline);
        })
        socket.on('newMessage', (msg) => {
           let currentUser = findUser(socket.client.id);
            message = messageFormat(currentUser[0].email, msg, currentUser[0].avatar);
           WSServer.emit('updateMessages', message);

        })

        /* Websockets que controlan la creacion y actualizacion de los productos */
        const products = new Products();
        
        socket.on('getProducts', () => {
            socket.emit('productList', arrayProducts);
        })

        socket.on('create', (data) => {
            products.saveProduct(data.title, data.price, data.thumbnail, arrayProducts)

            WSServer.emit('productList', arrayProducts);
        })

        socket.on('initChat', (userEmail) => {
            console.log('Un nuevo usuario inicializo el chat!')

        })

    })

    return WSServer;
}

module.exports = initWebsocketServer;
