const moment = require('moment');

const arrayUsers = [ ];

const addUser = (socketId, userEmail) => {
    const user = {
        id: socketId,
        email: userEmail
    }
    arrayUsers.push(user);
    return arrayUsers
}
const getUsers = () => {
    return arrayUsers
}
const messageFormat = (email, msg) => {
    console.log('Me activaron')
    return {
        email: email,
        msg: msg,
        time: moment().format('DD/MM/YYYY | h:mm:ss')
    }
}
module.exports = {
    addUser,
    getUsers,
    messageFormat
}