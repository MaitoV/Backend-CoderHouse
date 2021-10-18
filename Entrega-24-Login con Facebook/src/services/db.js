const mongoose = require('mongoose');

module.exports = function connectDB () {
    return mongoose.connect(`mongodb+srv://roboti:CoderHouseTest1234@cluster0.nodly.mongodb.net/ecommerceCH?retryWrites=true&w=majority`, {useNewUrlParser: true})
}