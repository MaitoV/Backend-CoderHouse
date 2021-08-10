# Eligiendo motor de plantillas


Luego de probar los motores de plantillas: handlebars, pug y ejs decidi que utilizare para trabajar el proyecto final el motor ejs.
A continuacion desarrollo algunas caracteresticas que observe de los diferentes motores de plantillas que justifican mi eleccion:

 ## :thumbsdown: **Handlebars:**
- Encontre muchos errores a la hora de utilizar expresiones de condición con cierta logica.
- Tiene una sintaxis propia que debemos conocer para poder utilizarlo.
- La configuración inicial en express requiere mas lineas que con otros motores de plantillas.
- Algunas partes de la sintaxis como el cierre de un if antes del else resultan confuso.
```{{else}}
    <p class="txt-center">No hay productos</p>
{{/if}}```
- Me agrada que la sintaxis de javascript embebido y html se mantengan visualmente separados.

 ## :thumbsdown: **PUG:**
- Tiene una sintaxis propia que debemos conocer para poder utilizarlo.
- Si bien reduce la cantidad de lineas de HTML que utilizariamos normalmente, al no existir etiquetas de cierre, observo que la indentacion obligatoria que exige para lograr este truco puede ser un infierno cuando el codigo de html es extenso (parecido al callback hell).
- La separacion entre el javascript embebido y el html no es muy visual ni rapido de identificar.
 
 ## :+1: **EJS:**
- Hay una clara separacion visual entre el javascript embebido y el html, lo cual hace mas facil identificar y encontrar cada parte cuando tenemos un codigo muy extenso.
- No requiere aprender una nueva sintaxis, podemos utilizar javascript tal y como lo utilizariamos normalmente. En este sentido lo encuentro mas intuitivo.
- Podemos implementar toda la logica de javascript que deseemos.

