//import express from 'express';
const express = require('express');
const fs = require('fs/promises');

const port = 8080;
const app = express();

const server = app.listen(port, () => {
    console.log(`Servidor arriba corriendo chidorito en el puerto ${port}`)
})
server.on('error', (error) => {
    console.log('Error ->', error)
})

/* CONSIGNA: Realizar un proyecto de servidor basado en nodejs que utilice el middleware express e implemente 3 endpoints en el puerto 8080.
1) Ruta get '/items' que responda un objeto con todos los productos y su cantidad total en el siguiente formato: 
{items: [productos], cantidad: (cantidad productos)} 
2) Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de productos que se encuentran en el archivo productos.txt. El formato de la respuesta sera {item: producto}
3) la ruta get '/visitas' devuelve un objeto que indica cuantas veces se visito la ruta del punto 1 y cuantas veces se visito la ruta del punto 2. Constestar con el formato {visitas: {items: cantidad, item: cantidad}}
Usar 'productos.txt del desafio anterior'
*/
const readArchive = () => {
    let file = fs.readFile('./productos.txt', 'utf-8');
    return file;
}
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
const objectCounter = {
    items: 0,
    itemRandom: 0
}


app.get('/items', async (req, res) => {
    let arrayProductos = await readArchive();
    arrayProductos = JSON.parse(arrayProductos);

    const objectResponse = {
        items: arrayProductos,
        cantidad: arrayProductos.length
    }
    objectCounter.items += 1;
    res.send(objectResponse)
})
app.get('/item-random', async (req, res) => {
    let arrayProductos = await readArchive();
    arrayProductos = JSON.parse(arrayProductos);

    const number = randomNumber(0, arrayProductos.length)

    const objectResponse = {
        item: arrayProductos[number]
    }
    objectCounter.itemRandom += 1;
    res.send(objectResponse);
})
app.get('/visitas', (req, res) => {
    const objectResponse = {
        visitas: objectCounter
    }
    res.send(objectResponse)
})



