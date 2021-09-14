const knex = require('knex');
const mongoose = require('mongoose');
const initProducts = require('../seeds/products');
const URL = 'mongodb://localhost:27017/ecommerce';

const mongoDB = async () => {
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
const initDB = async () => {
    mongoDB();
}

module.exports = {
    initDB
}