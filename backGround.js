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
limitedList()