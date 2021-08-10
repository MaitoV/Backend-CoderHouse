const operacion = async (numero1: number, numero2: number, op: string ) => {
  let resultado : number;
  const {opSuma, opResta} = await import('./funciones')
      if(op == 'suma' || op == 'Suma') {
          resultado = new opSuma(numero1, numero2).operacion();
          return resultado;
      } 
      if (op == 'resta' || op == 'Resta') {
          resultado = new opResta(numero1, numero2).operacion();
          return resultado;
      } else {
          return 'La operacion ingresada es incorrecta, intenta con otra'
      }
}
const operaciones = async (arrayOperaciones: Array<any>) => {
  //El for of no funciona en este punto devuelve error del elemento particular
  //forEach no me devuelve un array de promesas
  //Se necesita algo que recorra el array original y a su vez lo modifique con el estado de la promesa
  let promises = arrayOperaciones.map(async (op) => await operacion(op[0],op[1],op[2]) )
  /*Promise.allSettled no funciona, pide cambiar la lib a 2020, pero al cambiarlo esa informacion 
  sigue dando error */
  Promise.all(promises)
  .then((resultados) => resultados.forEach((resultado) => console.log(resultado)))
}

let arrayOperaciones: Array<any> = [
  [12,2,'suma'],
  [12,2,'Resta'],
  [25,5,'Suma'],
  [25,5,'resta']
]

operaciones(arrayOperaciones);

