const io = require('socket.io');
const messagesOperations = require('../db/messagesOperations');
const productsOperations = require('../db/productsOperations');
const normalizr = require('../utils/normalizeMsgs');
const normalizrMsgs = new normalizr();

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
            
            //MENSAJES NORMALIZADOS
            const getAllMessages = await messagesOperations.getAllMessages();
            const normalizeMsgs = normalizrMsgs.normalize(getAllMessages);
            socket.emit('welcome', normalizeMsgs);

            newMessage = messagesOperations.messageFormat('Roboti', `${userEmail}! se unio al chat`);


            socket.broadcast.emit('userJoin', newMessage);
            let usersOnline = await messagesOperations.getUsers();
    
            WSServer.emit('getUsers', usersOnline);
        })
        socket.on('newMessage', async (msg) => {
           let currentUser = await messagesOperations.findUser(socket.client.id);
        
           let newMessage = {
               author: {
                   id: currentUser[0].socket_id,
                   email: currentUser[0].email,
                   avatar: currentUser[0].avatar
               },
               text: msg
           }
            await messagesOperations.saveMessage(newMessage);

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

    })

    return WSServer;
}

module.exports = initWebsocketServer;
