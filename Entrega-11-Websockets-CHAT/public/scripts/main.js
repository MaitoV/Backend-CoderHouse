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
const submitInitChat = document.getElementById('initChat');
const wrapperInitChat = document.getElementById('initChatWrapper');
let userEmail;

submitInitChat.addEventListener('click', () => {
    userEmail = document.getElementById('email').value;
    wrapperInitChat.style.setProperty("display", "none", "important");
    
    socket.emit('initChat', userEmail);
    
})








