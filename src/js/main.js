console.table({ status: 'working' });

const form = document.getElementById('novoItem');
const list = document.getElementById('list');
const eraseListButton = document.getElementById('eraseList');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

eraseListButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

itens.forEach(element => {
    createNewListItem(element);
});

form.addEventListener('submit', event => {
    event.preventDefault();
    
    const name = event.target.elements['nome'];
    const quantity = event.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.name === name.value);
    const itemAtual = {
        "name": name.value,
        "quantity": quantity.value
    }

    if(existe) {
        itemAtual.id = existe.id;
        updateElement(itemAtual);
        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        createNewListItem(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
    
    name.value = "";
    quantity.value = "";
});

function createNewListItem(item) {
    const newListItem = document.createElement('li');
    const strong = document.createElement('strong');
    
    newListItem.classList.add('item');
    strong.innerHTML = item.quantity;
    strong.dataset.id = item.id;
    newListItem.appendChild(strong);
    newListItem.innerHTML += item.name;
    newListItem.appendChild(deleteButton(item.id))
    list.appendChild(newListItem);
}

function updateElement(item) {
    document.querySelector('[data-id="'+item.id+'"]').innerHTML = item.quantity;
}

function deleteElement(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(element => element.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));

}

function deleteButton(id) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteItem');
    deleteButton.innerText = 'X';

    deleteButton.addEventListener('click', function() {
        deleteElement(this.parentNode, id);
    })

    return deleteButton;
}
