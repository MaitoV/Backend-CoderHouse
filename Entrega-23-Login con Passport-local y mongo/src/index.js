const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiRouter = require('./routes/api');
const http = require('http');
const initWebsocketServer = require('./services/sockets');
const DBService = require('./db/config/config');
const session = require('express-session');
const mongoStore= require('./utils/mongoSessionStore');
const checkLogin = require('./middleware/checklogin');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

const tenMinutes = 10000 * 60;
app.use(cookieParser());
app.use(session({
    store: mongoStore,
    secret: 'Oeste.42.Primavera.17.Temporada',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: tenMinutes}
}))


app.use('/api', apiRouter);
app.use('/', checkLogin, (req, res) => {
    res.render('main')
})

const httpServer = http.Server(app);
initWebsocketServer(httpServer);

httpServer.listen(port, () => console.log('Server up en puerto', port));

DBService.initDB();







