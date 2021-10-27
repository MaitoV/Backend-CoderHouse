const mongoStore = require('connect-mongo');

module.exports = mongoStore.create({
        mongoUrl: `mongodb+srv://roboti:CoderHouseTest1234@cluster0.nodly.mongodb.net/ecommerceCH?retryWrites=true&w=majority`,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    });

