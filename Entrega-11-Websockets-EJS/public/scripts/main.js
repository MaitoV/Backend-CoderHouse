const socket = io.connect();
socket.emit('getProducts');

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








