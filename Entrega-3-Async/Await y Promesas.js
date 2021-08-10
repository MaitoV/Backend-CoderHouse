/* Consigna: - Desarrollar una funcion que permita recorrer un texto que se le pase como parametro y muestre cada una de las palabras en un tiempo estipulado. El finalizar debe ejecutar una funcion pasada como callback 
- Realizar tres llamadas a la funcion con porciones de texto que tienen que ser representados en forma ordenada. Inicialmente todas las palabras del primero, luego las del segundo y finalmente las del tercero.
-Hacer configurable el tiempo de representacion de palabras mediante un parametro opcional. Si este no se define sera cada un segundo 
- Al finalizar la operacion completa debe imprimir: 'proceso completo' y tambien mostrar la cantidad de letras.
*/

/* RESOLUCION CON PROMESAS */
const showWords = (text, time = 1000, callback) => {
    const splitText = text.split(" ");
    let counter = 0;

    return new Promise((resolve, reject) => {
        let timer = setInterval(()=> {
            if(counter != splitText.length) {
                console.log(splitText[counter]);
                counter++;
            } else {
                clearInterval(timer);
                callback()
                resolve(counter);
            }
        }, time)
    })
}
const callbackFunction = () => {
    console.log('Termine!')
}

let totalPalabras = 0;

showWords('Texto UNO prueba', 1500, callbackFunction)
.then((palabras)=> {
    totalPalabras = totalPalabras + palabras;
    showWords('Texto DOS', 1200, callbackFunction)
    .then((palabras) => {
        totalPalabras = totalPalabras + palabras;
        showWords('Texto TRES', 1000, callbackFunction)
        .then((palabras) => {
            totalPalabras = totalPalabras + palabras;
            console.log(`proceso completo, se imprimeron un total de ${totalPalabras} palabras`);
        })
    })
})


/* RESOLUCION CON Async - Await */
/*
const showWords = async (text, time = 1000, callback) => {
    let splitText = text.split(" ");
    let counter = 0;
    let timer = setInterval(()=> {
        if(counter != splitText.length) {
            console.log(splitText[counter]);
            counter++;
        } else {
            clearInterval(timer)
            callback()
            return counter;
        }
    }, time)
} 

const callbackFunction = () => {
    console.log('Termine!')
}
const executorFunction = async () => {
    //Si bien estableci una funcion async para establecer bloqueos al codigo a traves de await los textos se ven todos mezclados, no esperan a la finalizacion del otro intervalo antes de arrancar el siguiente
    let firstRound = await showWords('Texto UNO prueba', 1500, callbackFunction);
    let secondRound = await showWords('Texto DOS prueba', 150, callbackFunction);
    let thirdRound = await showWords('Texto TRES prueba', 1800, callbackFunction);

    Promise.allSettled([firstRound, secondRound, thirdRound])
    .then((respuestas) => console.log(respuestas));
}
executorFunction()  */