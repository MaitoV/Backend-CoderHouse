const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    author: {
        id: {type: String, required: true},
        email: {type: String, required: true},
        avatar: {type: String, required: true}
    },
    text: {type: String, required: true},
}, {timestamps: true}, {versionKey: false});

const mensajes = new mongoose.model(mensajesCollection, mensajesSchema);

module.exports = mensajes;