// state

var defaultState = {
    attivo: [],
    completato: []
  };
  
  window.state = window.state || defaultState;
  
  /**
   * Aggiunge un elemento alla todo-list
   * @param {string} text 
   */
  var addItem = function (text) {
    console.info('aggiungo elemento', text);
    window.state.attivo = window.state.attivo.concat(text);
  }
  
  /**
   * Rimuove un indice dalla todo-list attiva
   * @param {number} index 
   */
  var completeItem = function (index) {
    console.info('rimuovo elemento', index);
    // aggiungi l'elemento da rimuovere alla lista dei completati
    window.state.completato = window.state.completato.concat(window.state.attivo[index]);
  
    // rimuovi l'elemento dalla lista
    window.state.attivo = window.state.attivo.filter(function (elementText, i) {
      return i !== index 
    });
  }
  
  /**
   * Salva lo stato nel browser
   */
  var saveStorage = function () {
    console.info('salvo in localstorage', window.state);
    return localStorage.setItem('todo-list', JSON.stringify(window.state));
  }
  
  /**
   * Legge lo stato dal browser
   */
  var readStorage = function () {
    var data = localStorage.getItem('todo-list');
    console.info('leggo la da localstorage', data);
    if (data === null) return defaultState;
  
    return JSON.parse(data);
  }
  
  // render
  
  var mainContainer = document.querySelector('#list');
  var mainCompleted = document.querySelector('.lista-completata');
  
  var renderItem = function (text, index, noEvent) {
    var node = document.createElement('li');
    var innerText = document.createElement('span');
    innerText.innerText = text;
  
    node.appendChild(innerText);
    if (!noEvent) node.addEventListener('click', removeItemClick.bind(undefined, index));
    return node;
  }
  
  var renderDomList = function (list, elements) {
    elements.forEach(function (element) {
      list.appendChild(element);
    })
  }
  
  var clearList = function (list) {
    list.innerHTML = '';
  }
  
  var renderList = function (list, DOMList, noEvent) {
    var items = list.map(function (elementText, index) {
      return renderItem(elementText, index, noEvent);
    })
  
    clearList(DOMList);
    renderDomList(DOMList, items);
  }
  
  var renderActives = function () {
    console.info('rendering', window.state.attivo);
    renderList(window.state.attivo, mainContainer, false);
  }
  
  var renderDone = function () {
    console.info('rendering', window.state.completato);
    console.log(mainCompleted);
    renderList(window.state.completato, mainCompleted, true);
  }
  
  var addItemButtonClick = function () {
    console.info('click su bottone aggiunta');
    var inputValue = document.querySelector('#instodo').value.trim();
    if (inputValue !== '') addItem(inputValue);
    renderActives();
  }
  
  var removeItemClick = function (index) {
    console.info('click su bottone rimozione', index);
    completeItem(index);
    renderActives();
    renderDone();
  }
  
  // esportazione
  var es5TodoList = {
    readStorage: readStorage,
    saveStorage: saveStorage,
    addItemButtonClick: addItemButtonClick,
    removeItemClick: removeItemClick,
    renderAll: function () {
      renderActives();
      renderDone();
    }
  };
  
  // runtime
  var addButton = document.querySelector('#addtodo');
  addButton.addEventListener('click', es5TodoList.addItemButtonClick);
  
  window.addEventListener('beforeunload', es5TodoList.saveStorage);
  window.addEventListener('load', function () {
    window.state = es5TodoList.readStorage();
    es5TodoList.renderAll();
  });