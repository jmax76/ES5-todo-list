// CREO LE VARIABILI LISTA / AGGIUNGI / RIMUOVI

var lista = document.getElementById('list'),
    remAll = document.getElementById('remAll'),
    addtodo = document.getElementById('addtodo')

// CHIAMO FUNZIONE AL CLICK DEL BOTTONE ADD
addtodo.onclick = () => {
    console.log("Hai cliccato il bottone "+addtodo.id);
    addItem(lista);
};

// CHIAMO FUNZIONE AL CLICK DEL BOTTONE REMOVE
remAll.onclick = () => {
    console.log("Hai cliccato il bottone "+remAll.id)
};

// FUNZIONE AGGIUNGI ITEM ALLA LISTA
function addItem(targetItem) {
    // CREO LE VARIABILI
    var testoItem = document.getElementById('instodo').value,
        li = document.createElement('li'),
        content = document.createTextNode(testoItem + ' '),
        remBut = document.createElement('button');

    // RIMUOVO IL TESTO DALL'INPUT TO-DO
    document.getElementById('instodo').value = '';

    // APPENDO IN NUOVO ELEMENTO TESTO ALLA LI
    li.appendChild(content);
    li.appendChild(remBut);

    remBut.className = 'elimina';
    remBut.innerHTML = ' Ok inserito';
    remBut.setAttribute('onclick', 'elimina(this);');

    // CONTROLLO CHE L'INPUT NON SIA VUOTO
    if (testoItem.split(' ').join('').length === 0) {
        alert('non hai compilato il campo');
        console.log('non hai compilato il campo');
        return false;
    }    

    // APPENDO LA LI ALLA LISTA
    targetItem.appendChild(li);

    // FUNZIONE PER ELIMINARE ITEM DALLA LISTA
    function elimina(item) {
        var parent = item.parentElement;
        parent.parentElement.removeChild(parent);
    }

    // RIMUOVO TUTTI GLI ELEMENTI DELLA LISTA
    remAll.onclick = function() {
        lista.innerHTML = '';
    };
}