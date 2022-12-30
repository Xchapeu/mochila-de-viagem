console.table({ status: 'working' });

const form = document.getElementById('novoItem');
const list = document.getElementById('list');
const eraseButton = document.getElementById('eraseList');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

eraseButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

itens.forEach(element => {
    createNewListItem(element);
});

function createNewListItem(item) {
    const newListItem = document.createElement('li');
    const strong = document.createElement('strong');
    
    newListItem.classList.add('item');
    strong.innerHTML = item.quantity;
    newListItem.appendChild(strong);
    newListItem.innerHTML += item.name;
    list.appendChild(newListItem);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const name = event.target.elements['nome'];
    const quantity = event.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.name === name.value);

    console.log(existe);

    const itemAtual = {
        "name": name.value,
        "quantity": quantity.value
    }
    
    createNewListItem(itemAtual);

    itens.push(itemAtual);
    
    localStorage.setItem("itens", JSON.stringify(itens));
    
    name.value = "";
    quantity.value = "";
});
