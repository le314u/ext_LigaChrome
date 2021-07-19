/*function limitedList(){
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

	function inShop(){
		let listaAll = document.getElementById('listaAll').value.split(/\n/)
		let listaOff = document.getElementById('listaOff').value.split(/\n/)
		let listaNew = [];
		listaAll.forEach(item => {
			let newItem = item
			newItem = newItem.replace(/[0-9]+(.?[0-9]+)+ /, "");
			if((listaOff.indexOf(newItem) == -1) ){
				listaNew.push( "1 "+newItem );
			}
		});
		let auxStr = ""
		listaNew.forEach( item=>{ auxStr=  auxStr + "\n" + item} )
		copy(auxStr)
		return listaNew
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
function deltaValue(){

	function value(v){
		v=v.replace("R$","")
		v=v.replace(",",".")
		v=v.replace(" ","")
		return parseFloat(v)
	}

	function valueCard(docString){
		var doc = stringToHTML(docString);
		var lowerPrice = ''
		try {
			lowerPrice = doc.getElementsByClassName("preco-menor")[0].innerText;
			lowerPrice = value(lowerPrice)
		} catch (error) {
			lowerPrice = 0.0;
		}	
		return lowerPrice
	}	
	
	function changeData(data, valueBuy,inputNew){
		var minLiga = valueCard(data)
		inputNew = valueBuy-minLiga
	}

	//Percorre todas as lojas
	var shops = document.querySelectorAll(".pad-bot-10")
	shops.forEach(shop => {
		var cards = shop.querySelectorAll(".row")
		cards.shift();// Remove o primeiro item que é a legenda
		cards.forEach(card => {

			var name=card.querySelector(".cardtitle").innerText.split('/')[0]
			var valueBuy=value(card.querySelector("div.col-lg-1.col-md-1.col-sm-1.hidden-xs.preco.item-subpreco").innerText)
			var inputNew=card.querySelector("preco-total item-total")

			var url = "https://www.ligamagic.com.br/?view=cards/card&card=" + name;

			// Fetch url (goes to bg_page.js)
			chrome.runtime.sendMessage(url, data => changeData(data, valueBuy,inputNew)); 
		})
	});
	
}*/