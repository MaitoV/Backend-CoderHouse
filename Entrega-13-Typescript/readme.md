## MONTAR UN SERVIDOR CON TYPESCRIPT
1- luego de haber realizado todos los pasos para instalar y configurar typescript, nodemomn y los scripts seguimos
2- instalamos express ( npm i --save express ) y en nuestro app.js hacemos: ( import express from 'express'; ). Como esto nos va a dar un error en express debemos instalar una dependencia mas para typescript ( npm i -D @types/express ) y se soluciona.
3- Luego de importar express escribimos:
import express from 'express';
import path from 'path';
import * as http from 'http';
const app = express();

const puerto = process.env.PORT || 8080; //Si tenemos definida la variable.port utilizara eso, si no por defecto 8080

const httpServer = new http.Server(app);

httpServer.listen(puerto, () => {
    console.log('Server corriendo en el puerto', puerto)
})
4- Creamos una ruta '/' para ver que el servidor este funcionando bien y lo testeamos desde postman:
app.get('/', (req, res) => {
    res.json({
        msg: 'Holi!'
    })
})
5- Creamos la estructura de nuestro proyecto, creamos las carpetas: routes, controllers, services.
6- En la carpeta services creamos el archivo: server.ts
import express from 'express';
import * as http from 'http';
const app = express();


app.get('/', (req, res) => {
    res.json({
        msg: 'Holi!'
    })
})

const httpServer = new http.Server(app);

export default httpServer;
7- En el archivo app.ts dejamos unicamente
import server from './services/server';

const puerto = process.env.PORT || 8080; //Si tenemos definida la variable.port utilizara eso, si no por defecto 8080

server.listen(puerto, () => {
    console.log('Server corriendo en el puerto', puerto)
})
8- En la carpeta server.ts agregamos nuestra carpeta public (que crearemos fuera de src en la misma jerarquia)
const publicPathFolder = path.resolve(__dirname, '../../public');
app.use(express.static(publicPathFolder));
9-En la carpeta routes creamos un index.ts que sera el router principal que importa todas las rutas:
//Ruter principal que importara todas las demas rutas
import {Router} from 'express';
import productsRouter from './productos';
const router = Router();

//Todo lo que venga con el prefijo /products se lo delego al router de productos
router.use('/products', productsRouter);

export default router;
10- En la misma carpeta de routes creamos un archivo exclusivo para las rutas de productos llamada: productos.ts
import {Router} from 'express';
const router = Router();


router.get('/', (req, res) => {
    res.json('GET A PRODUCT!');
})
router.post('/', (req, res) => {
    res.json('POST A PRODUCT!');
})
router.put('/', (req, res) => {
    res.json('PUT A PRODUCT!');
})
router.delete('/', (req, res) => {
    res.json('DELETE A PRODUCT!');
})

export default router;
11- Finalmente volvemos al archivo server.ts y ahi importamos el archivo de todas las rutas
import mainRouter from '../routes'; //Agarra por defecto el index
import mainRouter from '../routes/index'; //es exactamente lo mismo
//Todo lo que empiece con /api se lo mando a mi apiRouter
app.use('/api', apiRouter);



