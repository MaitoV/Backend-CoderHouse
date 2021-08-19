# 🚀 Entrega 12: CANAL DE CHAT (Websockets)

### Consigna 🔧
Añadiremos al proyecto un canal de chat (basado en websocket) entre el servidor y el cliente.

### Aspectos a incluir en el entregable 🖇️
- En la parte inferior del formulario de ingreso se presentará el centro de mensajes
almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados
por su email.
- El formato a representar será: email (texto negrita en azul) [fecha y hora (DD/MM/YYYY
HH:MM:SS)](texto normal en marrón) : mensaje (texto italic en verde)
- Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email
(obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un
botón.
- Los mensajes deben persistir en el servidor en un archivo.

### ✍️ Extra a tener en cuenta 
Subir la app a glitch.com y probar la funcionalidad completa.
Nota: agregar al package.json la clave siguiente
"engines": {
"node": ">=14.0.0",
"npm": ">=6.0.0"
}
Esto permite que, al momento de configurar el proyecto, glitch instale una versión de node.js igual
o superior a la versión 14 para permitir el uso del import de módulos (ES Modules) en el código del
servidor.
