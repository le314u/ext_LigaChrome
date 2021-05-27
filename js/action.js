// When the button is clicked, inject setPageBackgroundColor into current page
let listLtda = document.getElementById("newList");
let inShoop = document.getElementById("inShoop");


listLtda.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: limitedList
	});
});

inShoop.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: newList
	});
});

function limitedList(){
	function getList(){
		function comparar(a, b) {
			//Quebra a String e pega a primeira parte referente ao valor
			let newA = parseFloat(a[0]);
			let newB = parseFloat(b[0]);
			//Ordena de acordo com o valor
			if(newA < newB) { return -1 }
			if(newA > newB) { return 1 }
			return 0;
		}
		function linhaValid(linha){
			return linha.getElementsByTagName("td").length == 4;
		}
		function qtd(linha){
			return linha.getElementsByTagName("td")[0].innerText;
		}
		function valor(linha){
			return linha.getElementsByTagName("td")[3].innerText.replace(',','.');
		}
		function nome(linha){
			return linha.getElementsByTagName("td")[1].innerText;
		}

		let Deck = document.getElementsByClassName("pdeck-block")[0];
		let tbody = Deck.getElementsByTagName("tbody")[0];
		let linhas = tbody.getElementsByTagName("tr");
		let cards = [];

		for (let linha of linhas){
			if(linhaValid(linha)){
				cards.push([valor(linha),qtd(linha),nome(linha)]);
			}
		}
		cards.sort(comparar);
		return cards;
	}
	function copy(string){
		let inputTest = document.createElement("textarea");
		inputTest.value = string;
		//Anexa o elemento ao body
		document.body.appendChild(inputTest);
		//seleciona todo o texto do elemento
		inputTest.select();
		//executa o comando copy
		//aqui é feito o ato de copiar para a area de trabalho com base na seleção
		document.execCommand('copy');
		//remove o elemento
		document.body.removeChild(inputTest);
	}
	let limited = parseFloat(prompt("Digite o valorLimite da carta"))
	if(limited === NaN){ 
		alert("Valor invalido digite apenas numeros e use '.' ")
		return
	}
	let listaNew = [];
	listaAll = getList()
	listaAll.forEach(newItem => {
		let value = parseFloat(newItem[0])
		if( value <= limited){
			listaNew.push( newItem[1].trim()+' '+newItem[2]);
		}
	});
	let auxStr = ""
	listaNew.forEach( card=>{ auxStr=  auxStr + "\n" + card} )
	copy(auxStr)
	alert("Lista com "+listaNew.length+' itens copiada para a area de transferencia')
	return listaNew
}



function newList(){
	function listCardsOut(){
		let listRaw = document.querySelector("#pesquisa-body").innerText
		let aux = listRaw.replace("Ops! Ocorreram erros em sua pesquisa.\n\nVerifique sua Lista de Cards e os Filtros utilizados e efetue uma nova pesquisa.\n\n\nCards sem estoque\n","")
		aux = aux.replace("\n\n\n\nVerifique o Idioma, Qualidade, Edição e Extras preenchidos e realize uma nova busca.","")
		aux = aux.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
		let listReturn = aux.split('\n')
		return listReturn
	}
	function inShop(){
		let listaAll = document.querySelector("#card_list").value.split(/\n/)
		let listaOff = listCardsOut()

		let listaNew = [];
		listaAll.forEach(item => {
			let amount = item.split(' ')[0];
			let newItem = item.replace(/[0-9]+ /,"");
			if((listaOff.indexOf(newItem) == -1) ){
				listaNew.push( amount+' '+newItem );
			}
		});
		let result = listaNew.join('\n')
		// Atualiza nova Lista
		document.querySelector("#card_list").value = result
		alert(listaOff.length + ' itens removidos')
		copy(result)
	}

	function copy(string){
		let inputTest = document.createElement("textarea");
		inputTest.value = string;
		//Anexa o elemento ao body
		document.body.appendChild(inputTest);
		//seleciona todo o texto do elemento
		inputTest.select();
		//executa o comando copy
		//aqui é feito o ato de copiar para a area de trabalho com base na seleção
		document.execCommand('copy');
		//remove o elemento
		document.body.removeChild(inputTest);
	}
	inShop();
}