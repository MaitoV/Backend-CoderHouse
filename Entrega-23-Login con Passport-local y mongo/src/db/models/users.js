const mongoose = require('mongoose');

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    socket_id: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true}
}, {versionKey: false});

const users = new mongoose.model(usersCollection, usersSchema);

module.exports = users;