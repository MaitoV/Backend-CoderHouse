const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./routes/api');
const http = require('http');
const initWebsocketServer = require('./services/sockets');
const DBService = require('./db/config/config');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api', apiRouter);
app.use('/', (req, res) => {
    res.render('main')
})

const httpServer = http.Server(app);
initWebsocketServer(httpServer);

httpServer.listen(port, () => console.log('Server up en puerto', port));

DBService.initDB();







