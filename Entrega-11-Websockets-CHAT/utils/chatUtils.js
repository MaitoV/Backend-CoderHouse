const moment = require('moment');
let arrayUsers = [];

const addUser = (socketId, userEmail) => {
    let newUser = {
        id: socketId,
        email: userEmail
    }
    return arrayUsers.push(newUser);
}
const findUser = (id) => {
    return arrayUsers.filter((aUser) => aUser.id === id)
}
const getUsers = () => {
    return arrayUsers
}
const messageFormat = (email, msg) => {
    return {
        email: email,
        msg: msg,
        time: moment().format('DD/MM/YYYY | h:mm:ss')
    }
}
module.exports = {
    addUser,
    getUsers,
    messageFormat,
    findUser,
    arrayUsers
}