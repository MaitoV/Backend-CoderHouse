/* Implementar programa que contenga una clase llamado Archivo que reciba el nombre del archivo con el que se va a trabajar e implementar los metodos leer, guardar, borrar.
-Utilizar guardar para incorporar productos al archivo 'productos.txt'
El formato de cada producto sera:
{
    title: (nombre del producto),
    precio: (precio),
    thumbnail: (url de la foto)
}
- La funcion guardar incorporara al producto un id, el cual se obtendra de la longitud total del array actual mas 1
- Con el metodo leer se mostrara en consola el listado total (si el archivo existe) como un array de productos. Si el archivo no existe se retornara un array vacio 
- El metodo borrar eliminar el archivo completo
- Implementar el manejo de archivos con el modulo fs de nodejs, utilizando promesas con async await y manejo de errores*/

const fs = require('fs/promises');

class Archive {
    constructor(archivo) {
        //Almacenamos el nombre del archivo con el que vamos a estar trabajando
        this.archiveName = archivo;
    }
    async readArchive(){
        try {
            //Leemos el archivo
            let readFile = await fs.readFile(`./${this.archiveName}`, 'utf-8');
            //Convertimos el archivo de JSON
            let fileParseado = JSON.parse(readFile);
            //Consologueamos el resultado
            console.log(fileParseado);
            //Retornamos el resultado para poder llamar a esta funcion nuevamente en el momento de guardar un nuevo producto
            return fileParseado;
        } catch (error) {
            //Si el archivo no existe va a entrar a este bloque por error, creamos un array vacio y lo retornamos 
            let emptyArray = [ ];
            console.log(emptyArray);
            return emptyArray;
        }
    }
    async saveProduct(titulo,precio, foto){
        try {
        //Llamamos a la funcion que lee el archivo, nos retornara o un array parseado o un array vacio
        let arrayProductos = await this.readArchive();

        const producto = {
            id: arrayProductos.length + 1,
            title: titulo,
            price: precio,
            thumbnail: foto }
        //Pusheamos dentro del array el nuevo producto
        arrayProductos.push(producto);
        //Esperamos a que se escriba el archivo con el array total de productos en formato JSON
        await fs.writeFile('./productos.txt', JSON.stringify(arrayProductos, null, '\t'))
        } catch (error) {
            console.log('Veniamos como unos campeones pero este proceso fallo ->' + error)
        }
    }
    async deleteArchive(){
        try {
            await fs.unlink(`./${this.archiveName}`)
            console.log('Archivo eliminado con exito');
        }
        catch (error) {
            console.log('Salvese quien pueda ->' + error)
        }
    }
}

let archivo1 = new Archive('productos.txt')
archivo1.readArchive()
//archivo1.saveProduct('linterna', 560.99, 'http://www.photo3.com')
//archivo1.deleteArchive()



