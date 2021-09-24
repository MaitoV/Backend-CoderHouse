const mongoose = require('mongoose');

const productosCollection = 'productos';

const productosSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    title: {type: String, required: true, max: 70},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
}, {timestamps: true}, {versionKey: false});

const productos = new mongoose.model(productosCollection, productosSchema);

module.exports = productos;