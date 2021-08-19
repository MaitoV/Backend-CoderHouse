const socket = io.connect();
socket.emit('getProducts');

/* Conexion socket que crea y actualiza el listado de productos*/
let titleValue;
let priceValue;
let thumbnailValue;
const tableBody = document.getElementById('tbody');

function createNewProduct () {
    const productDetails = {
        title: titleValue,
        price: priceValue,
        thumbnail: thumbnailValue
    }
    socket.emit('create', productDetails);
}

function submitForm (e) {
    e.preventDefault();
    titleValue = document.getElementById('title').value;
    priceValue = document.getElementById('price').value;
    thumbnailValue = document.getElementById('thumbnail').value;
    createNewProduct()
}

socket.on('productList', (data) => {
    const htmlData = data.map((value) => {
        return `
            <tr>
                <td>${value.title}</td>
                <td>${value.price}</td>
                <td><img class='img-thumbnail' src='${value.thumbnail}'> </td>
            </tr> `
        }).join(' ');

    tableBody.innerHTML = htmlData;
})

/* Conexion Socket para el chat*/
//Boton del formulario del ingreso del email
const submitInitChat = document.getElementById('initChat');
//Contenedor del inicio del chat para colocar tu mail
const wrapperInitChat = document.getElementById('initChatWrapper');
//Contenedor de las burbujas de chat
const messagesWrapper = document.getElementById('messagesWrapper');
//Contenedor de los usuarios conectados
const usersListContainer = document.getElementById('usersList');
let userEmail;

submitInitChat.addEventListener('click', () => {
    userEmail = document.getElementById('email').value;
    wrapperInitChat.style.setProperty("display", "none", "important");
    //Emite el evento de unirse al chat
    socket.emit('initChat', userEmail);
    //Escucha evento del mensaje del bienvenida al usuario que se esta uniendo
    socket.on('welcome', (data) => {
        messagesWrapper.innerHTML += `
        <div class="rigth media w-50 ml-auto mb-3">
          <div class="media-body">
            <div class="bg_primary rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-white">${data.msg}</p>
            </div>
            <p class="small text-muted">${data.time}</p>
          </div>
        </div>`
    })
    //Evento que avisa a todos los usuarios conectados que se unio un nuevo usuario
    socket.on('userJoin', (data) => {
        messagesWrapper.innerHTML += `
        <div class="rigth media w-50 ml-auto mb-3">
          <div class="media-body">
            <div class="bg_primary rounded py-2 px-3 mb-2">
              <p class="text-small mb-0 text-white">${data.msg}</p>
            </div>
            <p class="small text-muted">${data.time}</p>
          </div>
        </div>`
    })
    //Evento que actualiza el listado de usuarios online a todos
    socket.on('getUsers', (arrayUsers) => {
        let usersList = arrayUsers.map((aValue) => {
            return `<div class="list-group-item list-group-item-action active text-white rounded-0">
            <div class="media"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" class="rounded-circle">
              <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-1" id="userOnline"> 
                  <h6 class="mb-0">${aValue.email}</h6>
                </div>
              </div>
            </div>
          </div> `
        }).join(' ')
        usersListContainer.innerHTML += usersList;
    })

    
})








