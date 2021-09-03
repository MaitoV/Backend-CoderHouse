const { sqliteDB } = require('./db');
const moment = require('moment');

class MessagesOperations {
    async addUser(socketId, userEmail, avatarPic) {
        try {
            let newUser = {
                socket_id: socketId,
                email: userEmail,
                avatar: avatarPic
            }
            const addUser = await sqliteDB.from('users').insert(newUser);
            return addUser;
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
            const usersList = await sqliteDB.from('users').select();
            return usersList;
        } catch (error){
            throw error
        }
    }

    async findUser(socketID) {
        try {
            const getUser = await sqliteDB.from('users').where({socket_id: socketID});
             return getUser;
        } catch (error) {
            throw error
        }
    }

    async saveMessage(id, msg) {
        try {
            const newMsg = {
                socket_id: id,
                msg: msg
            }
            await sqliteDB.from('messages').insert(newMsg);
        } catch (error) {
            throw error;
        }
    }
}

const messagesOperations = new MessagesOperations();
module.exports = messagesOperations;