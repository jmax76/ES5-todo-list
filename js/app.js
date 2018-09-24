// VARIABILI STATO
var stato = {
	attivo: [],
	completato: []
};

// LOCAL STORAGE GET
var data = localStorage.getItem('data');
if (data) {
	stato = JSON.parse(data);
}

window.addEventListener('load', function handle() {
	'use strict';
	var listaAttiva = document.querySelector('ul.lista-attiva'),
	    listaCompletata = document.querySelector('ul.lista-completata'),
	    BloccoCompletato = document.querySelector('.blocco-completato'),
	    input = document.querySelector('#instodo'),
	    button = document.querySelector('button');

	function aggiorna() {
		var i,
		    j,
		    el;
		listaAttiva.innerHTML = '';
		listaCompletata.innerHTML = '';
		stato.attivo.sort();
		stato.completato.sort();

		for (i = 0; i < stato.attivo.length; i++) {
			el = document.createElement('li');
			el.innerHTML = stato.attivo[i];
			listaAttiva.appendChild(el);
		}

		for (j = 0; j < stato.completato.length; j++) {
			el = document.createElement('li');
			el.innerHTML = stato.completato[j];
			listaCompletata.appendChild(el);
		}
	}

	aggiorna();

	listaAttiva.addEventListener('click', function(e) {
		var a,
            target = e.target;
            
		target.classList.add('completato');

		for (a = 0; a < stato.attivo.length; a++) {
			if (target.innerHTML === stato.attivo[a]) {
				stato.completato.splice(1, 0, stato.attivo[a]);
				stato.attivo.splice(a, 1);
				localStorage.setItem('data', JSON.stringify(stato));
                console.log(stato);
                aggiorna();
			}
		}

	});

	button.addEventListener('click', function handleClick() {
		var text = input.value;
		if (text !== '') {
			stato.attivo.push(text);
			aggiorna();
            localStorage.setItem('data', JSON.stringify(stato));
            console.log(stato);
			input.value = '';
		}
	});

	input.addEventListener('keydown', function handleKeydown(e) {
		var text = input.value;

		if (e.keyCode === 13) {
			if (text !== '') {
				stato.attivo.push(text);
                localStorage.setItem('data', JSON.stringify(stato));
                console.log(stato);
				aggiorna();
				input.value = '';
			}
		}
	});
	
	BloccoCompletato.addEventListener('click', function() {
		listaCompletata.classList.toggle('invisible');
		if (listaCompletata.classList.contains('fadein')) {
			listaCompletata.classList.add('fadeout');
			listaCompletata.classList.remove('fadein');
		} else {
			listaCompletata.classList.add('fadein');
			listaCompletata.classList.remove('fadeout');
		}
    });

   

});

