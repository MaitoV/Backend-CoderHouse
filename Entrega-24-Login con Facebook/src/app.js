const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const apiRouter = require('./routes/api');

const http = require('http');
const initWebsocketServer = require('./services/sockets');
const connectDB = require('./services/db');

const passport = require('./middlewares/authentication');

const puerto = 8080;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());
app.use(session({
    secret: 'supersecretpasscode',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.get('/', (req, res) => {
  res.redirect('/api/users/login');
})


/*app.post('/signup', (req, res, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});*/


const httpServer = http.Server(app);
initWebsocketServer(httpServer);
connectDB().then(()=> {
    console.log('DB CONECTADA')
    httpServer.listen(puerto, () => console.log('Server up en puerto', puerto));
})