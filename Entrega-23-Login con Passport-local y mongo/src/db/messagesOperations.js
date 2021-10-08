const moment = require('moment');
const userModel = require('./models/users');
const mensajesModel = require('./models/mensajes');

class MessagesOperations {
    async addUser(socketId, userEmail, avatarPic) {
        try {
            let newUser = {
                socket_id: socketId,
                email: userEmail,
                avatar: avatarPic
            }
            const addUser = await userModel.create(newUser);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    getRandomAvatar() {
        let randomNumber = Math.floor(Math.random() * (10 - 1)) + 1;
        return `avatar${randomNumber}`;
    }

    messageFormat = (email, msg, avatar) => {
        let newMessage = {
            email: email,
            msg: msg,
            avatar: avatar,
            time: moment().format('DD/MM/YYYY | h:mm:ss')
        }
        return newMessage;
    }

    async getUsers() {
        try {
            const usersList = await userModel.find({});
            return usersList;
        } catch (error){
            throw error
        }
    }

    async findUser(socketID) {
        try {
            const getUser = await userModel.find({socket_id: socketID})
             return getUser;
        } catch (error) {
            throw error
        }
    }

    async saveMessage(newMsg) {
        try {
           return await  mensajesModel.create(newMsg);
        } catch (error) {
            throw error;
        }
    }

    async getAllMessages() {
        return await mensajesModel.find({});
    }
}

const messagesOperations = new MessagesOperations();
module.exports = messagesOperations;