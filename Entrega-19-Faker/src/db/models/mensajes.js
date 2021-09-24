const mongoose = require('mongoose');

const mensajesCollection = 'mensajes';

const mensajesSchema = new mongoose.Schema({
    socket_id: {type: String, required: true},
    msg: {type: String, required: true},
}, {timestamps: true}, {versionKey: false});

const mensajes = new mongoose.model(mensajesCollection, mensajesSchema);

module.exports = mensajes;