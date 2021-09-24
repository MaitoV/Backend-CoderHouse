const mongoose = require('mongoose');
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