const arrayUsers = [ ];

const addUser = (socketId, userEmail) => {
    const user = {
        id: socketId,
        email: userEmail
    }
    arrayUsers.push(user);
    return arrayUsers
}

module.exports = {
    addUser,
    arrayUsers
}