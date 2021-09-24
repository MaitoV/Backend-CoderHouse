const io = require('socket.io');
const messagesOperations = require('../db/messagesOperations');
const productsOperations = require('../db/productsOperations');

let initWebsocketServer = (httpServer) => {
    const WSServer = io(httpServer);
    WSServer.on('connection', (socket) => {
        let message;
        console.log('Un nuevo cliente se conecto!');


        socket.on('initChat', async (userEmail) => { 
            let newAvatar = messagesOperations.getRandomAvatar();
            await messagesOperations.addUser(socket.client.id, userEmail, newAvatar);

            newMessage = messagesOperations.messageFormat('Roboti',`${userEmail}, bienvenido al chat!`)
            socket.emit('welcome', newMessage);
            
            newMessage = messagesOperations.messageFormat('Roboti', `${userEmail}! se unio al chat`)

            socket.broadcast.emit('userJoin', newMessage);
            let usersOnline = await messagesOperations.getUsers();
    
            WSServer.emit('getUsers', usersOnline);
        })
        socket.on('newMessage', async (msg) => {
           let currentUser = await messagesOperations.findUser(socket.client.id);

           const newMessage = messagesOperations.messageFormat(currentUser[0].email, msg, currentUser[0].avatar);
            await messagesOperations.saveMessage(socket.client.id, msg);

           WSServer.emit('updateMessages', newMessage);
        })

        /*
        socket.on('getProducts', () => {
            socket.emit('productList', arrayProducts);
        })

        socket.on('create', (data) => {
            products.saveProduct(data.title, data.price, data.thumbnail, arrayProducts)

            myWSServer.emit('productList', arrayProducts);
        }) */

        socket.on('initChat', (userEmail) => {
            console.log('Un nuevo usuario inicializo el chat!')

        })

    })

    return WSServer;
}

module.exports = initWebsocketServer;
