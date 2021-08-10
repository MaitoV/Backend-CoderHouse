const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const handlebars = require('express-handlebars');

const app = express();
const port = 8080;

const server = app.listen(port, () => {
    console.log('Servidor arriba y corriendo');
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')));


app.set('view engine', 'hbs');
app.set('views', './views')
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs' })
);

server.on('error', (error) => console.log('Surgio un error ->', error) );

app.use('/api', apiRouter);

