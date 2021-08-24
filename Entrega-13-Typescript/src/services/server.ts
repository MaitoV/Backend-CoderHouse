import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index'; 
const app = express();

//Seteamos nuestra carpeta public
const publicPathFolder = path.resolve(__dirname, '../../public');
app.use(express.static(publicPathFolder));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use('/api', apiRouter);


const httpServer = new http.Server(app);

export default httpServer;