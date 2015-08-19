(function () {
	"use strict"

	let canvas = document.querySelector('#game-canvas');
	let context = canvas.getContext('2d');

	let altura = canvas.height, 
		largura = canvas.width;

	let alturaLinha = altura * 1/3, 
		larguraColuna = largura * 1/3;
	let bloquear = false;

	const X = {
		simbolo: 'X',
		valor: 1,
		cor: 'blue'
	};

	const O = {
		simbolo: 'O',
		valor: -1,
		cor: 'red'
	};

	let letra = X,
		jogadas = 9,
		tabuleiro = [[0,0,0], 
					 [0,0,0], 
					 [0,0,0]];

	function linha(x1, y1, x2, y2, larguraLinha) {
		context.beginPath();
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.lineWidth = larguraLinha || 1;
		context.stroke();
	};

	function linhasDotabuleiro() {
		linha(larguraColuna, 0, larguraColuna, altura);			// Linha vertical 1
		linha(larguraColuna * 2, 0, larguraColuna * 2, altura); // Linha vertical 2
		linha(0, alturaLinha, largura, alturaLinha);			// Linha horizontal 1
		linha(0, alturaLinha * 2, largura, alturaLinha * 2);	// Linha horizontal 2
	};

	function detectarColuna(x1) {
		if (larguraColuna >= x1)							// ( 200 >= x1 ) -> Primeira coluna
			return 0;
		if (x1 > larguraColuna && larguraColuna * 2 > x1)  	// ( x1 > 200 && 400 >= x1) -> Segunda coluna
			return 1; 
		if (x1 >= larguraColuna * 2)						// ( x1 > 400 ) -> Terceira coluna
			return 2;
	};

	function detectarLinha(y1) {
		if (alturaLinha >= y1)							// ( 200 >= y1 ) -> Primeira linha
			return 0;
		if (y1 > alturaLinha && alturaLinha * 2 > y1)	// ( x1 > 200 && 400 >= x1) -> Segunda linha
			return 1;
		if(y1 >= alturaLinha * 2)						// ( x1 > 400 ) -> Terceira linha
			return 2;
	};

	function clicks() {
		canvas.addEventListener('click', function (evt) {
			verificarClick(evt.offsetX, evt.offsetY);
		});

		canvas.addEventListener('touchstart', function(evt) {
			event.preventDefault();
			verificarClick(evt.touches[0].clientX - canvas.offsetLeft, evt.touches[0].clientY - canvas.offsetTop);
		});
	};

	function verificarClick(x1, y1) {
		let linha = detectarLinha(y1), 
			coluna = detectarColuna(x1);
		if (tabuleiro[linha][coluna] != 0 || bloquear) return;	//Não permitir a mesma casa 2 vezes

		context.fillStyle = letra.cor;
		tabuleiro[linha][coluna] = letra.valor;
		context.fillText(letra.simbolo, coluna * larguraColuna, ( linha+1 ) * alturaLinha);

		if (verificarVitoria(letra, linha, coluna)) {
			bloquear = true;
			setTimeout(function () {
				reiniciar();
			}, 3000);
			return;
		}

		jogadas -= 1;
		if (jogadas == 0) {
			setTimeout(function () {
				reiniciar();
			}, 3000);
			return;
		}

		letra = (letra === X ? O : X );
	};

	function verificarVitoria(letra, linha, coluna) {
		return verificarVitoriaPorLinha(letra, linha) || 
				verificarVitoriaPorColuna(letra, coluna) ||
				verificarVitoriaDiagonais(letra);
	};

	function verificarVitoriaPorLinha(letra, line) {
		let venceu = tabuleiro[line][0] + tabuleiro[line][1] + tabuleiro[line][2] === letra.valor * 3;
		if (venceu) {
			let linhaY = ((line+1 ) * alturaLinha) - alturaLinha/2;
			linha(0, linhaY, largura, linhaY, 5);
		}
		return venceu;
	};

	function verificarVitoriaPorColuna(letra, coluna) {
		let venceu = tabuleiro[0][coluna] + tabuleiro[1][coluna] + tabuleiro[2][coluna] === letra.valor * 3;
		if (venceu) {
			let linhaX = (coluna * larguraColuna) + larguraColuna/2;
			linha(linhaX, 0, linhaX, altura, 5);
		}
		return venceu;

	}

	function verificarVitoriaDiagonais(letra) {
		let diagonalPrincipal = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2] === letra.valor * 3;
		let diagonalSecundaria = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0] === letra.valor * 3;
		if (diagonalPrincipal) {
			linha(0, 0, largura, altura, 5);
		}

		if (diagonalSecundaria) {
			linha(largura, 0, 0, altura, 5);
		}

		return diagonalPrincipal || diagonalSecundaria;
	};
 
	function desenhar() {
		linhasDotabuleiro();
	};

	function inicio() {
		context.font = alturaLinha/2 + larguraColuna/2 + "px Times New Roman";
		context.strokeStyle = "#7F7F7F";
		context.fillStyle = "#404040";
		desenhar();
		clicks();
	}

	function reiniciar() {
		context.clearRect(0,0, canvas.width, canvas.height);
		tabuleiro = [[0,0,0], 
					 [0,0,0], 
					 [0,0,0]];
		jogadas = 9;
		bloquear = false;
		desenhar();
	};

	inicio();

}());