/* Desarrollar un servidor de nodejs que con cada requerimiento devuelva como resultado un objeto con las siguientes caracteristicas:
{
    id: (numero aleatorio de 1 a 10),
    title: 'producto ' + numero aleatorio de 1 a 10,
    price: (numero aleatorio entre 0.00 y 9999.99),
    tumbnail: "Foto " + (numero aleatorio entre 1 y 10)
}
Serializar el objeto con JSON.stringify() antes de enviarlo al front */

const http = require('http');

const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}
const randomDecimal = (min, max) => {
    return ((Math.random() * (max - min)) + min).toFixed(2);
}

const server = http.createServer((req, res) => {
  let object = {
    id: randomInteger(1, 10),
    title: 'Producto ' + randomInteger(1, 10),
    price: randomDecimal(0.00, 9999.99),
    thumbnail: 'Foto ' + randomInteger(1, 10)
  }
  let objectJSON = JSON.stringify(object);
    res.end(objectJSON);
})

server.listen(3000)