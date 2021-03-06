// CREO LE VARIABILI LISTA / AGGIUNGI / RIMUOVI

var lista = document.getElementById('list'),
    remAll = document.getElementById('remAll'),
    addtodo = document.getElementById('addtodo')

// CHIAMO FUNZIONE AL CLICK DEL BOTTONE ADD
addtodo.onclick = () => {
    console.log("Hai cliccato il bottone "+addtodo.id);
    addItem(lista);
};

// AGGIUNGO TRIGGER ENTER
var input = document.getElementById("instodo");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("addtodo").click();
    }
});

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
    
    
    // CONTROLLO CHE L'INPUT NON SIA VUOTO
    if (testoItem.split(' ').join('').length === 0) {
        alert('non hai compilato il campo');
        console.log('non hai compilato il campo');
        return false;
    } 


    // AGGIUNTA DEL PULSTANTE ELIMINA SU OGNI ITEM
    remBut.className = 'elimina';
    remBut.innerHTML = ' Elimina';
    remBut.setAttribute('onclick', 'elimina(this);');

       

    // APPENDO LA LI ALLA LISTA
    targetItem.appendChild(li);
    localStorage.setItem('todoList',list.innerHTML );
    //console.log(localStorage);
    

}
    
// FUNZIONE PER ELIMINARE ITEM DALLA LISTA
function elimina(item) {
    var parent = item.parentElement;
    parent.parentElement.removeChild(parent);
    localStorage.setItem('todoList',list.innerHTML );
}

list.innerHTML = localStorage.getItem('todoList');

// RIMUOVO TUTTI GLI ELEMENTI DELLA LISTA
remAll.onclick = function() {
    lista.innerHTML = '';
    localStorage.setItem('todoList',list.innerHTML );
};


