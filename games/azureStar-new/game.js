
var imagens, sons, started = false, pontuacao = 0;
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");
var animacao, colisor, stage1, teclado, player1;
var totalMidia = 0, carregadas = 0;
var volumeBar = document.getElementById('song-volume');
var liberado = false;

function carregarAssets() {
   imagens = {
   	boss1: 'boss1-min.png',
   	espaco: 'background/loading.jpg',
	player: 'ship_sprite.png', 
	enemy1: 'enemy_sprite.png',
	stage1: 'background/orionNebula.jpg',
	explosao: 'explosion.png',
	tiro: 'bullet.png',
	tiroInimigo: 'enemy_bullet.png',
	upgrade: 'upgrade_sprite_2.png'
   };
   
   for (var i in imagens) {
      var img = new Image();
      img.src = 'img/' + imagens[i];
      img.onload = carregando;
      totalMidia++;
      
      imagens[i] = img;
   }

   sons = {
   	menu: 'menu.mp3',
	in_game: 'in-game.mp3',
	tiro: 'tiro.mp3', 
	upgrade: 'upgrade.mp3',
	explosao: 'explosao.mp3',
	life: 'life.mp3',
	drop: 'drop.mp3',
   };
   
   for (var i in sons) {
      var snd = new Audio();
      snd.src = 'sounds/' + sons[i];
      snd.addEventListener('loadeddata', carregando, false);
      snd.load();
      totalMidia++;
      
      sons[i] = snd;
   }
};

function carregando() {
	context.save();
	context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);
    drawText("Azure Star", {x: context.canvas.width/ 2, y: context.canvas.height/ 5}, '70px Guardians');

	carregadas++;
	if (carregadas == totalMidia) {
		drawText("Aperte Enter para iniciar", {x: context.canvas.width/ 2, y: context.canvas.height/1.1}, '23px Guardians');
		iniciarObjetos();
    } else {
		var tamanhoTotal = context.canvas.width * .9;
		var tamanho = carregadas / totalMidia * tamanhoTotal;
		context.fillStyle = 'rgba(94, 211, 69, 0.5)';
		context.fillRect((context.canvas.width - tamanhoTotal)/2, context.canvas.height/1.2, tamanho, 50);

		context.restore();
	}

};

function drawText(string, location, font) {
	context.font = font;
	context.fillStyle = "#D30035";
    context.strokeStyle = 'black';
    context.textAlign = 'center';
    context.strokeText(string, location.x, location.y);
    context.fillText(string, location.x, location.y);
};

function iniciarObjetos() {
	animacao = new Animacao(context);
	colisor = new Colisor();
	stage1 = new Stage(context, imagens.stage1, colisor);
	teclado = new Teclado(document);
	player1 = new Player(context, teclado, imagens.player);

	teclado.disparou(ESPACO, function() {
		player1.atirar();
	});
}

function iniciar() {
	started = true;
	animacao.novoSprite(stage1);
	animacao.novoSprite(player1);
	colisor.novoSprite(player1);
	animacao.novoProcessamento(colisor);
	sons.menu.pause();
	sons.in_game.volume = volumeBar.value/400;
	sons.in_game.loop = true;
	sons.in_game.play();

	animacao.ligar();
};
carregarAssets();
sons.menu.volume = volumeBar.value/100;
sons.menu.loop = true;
sons.menu.play();

function gameOver() {
	animacao.desligar();
    context.save()
	context.textAlign = 'center';
	context.fillStyle = "#D30035";
    context.strokeStyle = 'black';
	context.font = '70px Guardians';
	context.fillText("GAME OVER", canvas.width/2, canvas.height/2.5);
	context.strokeText("GAME OVER", canvas.width/2, canvas.height/2.5);
	context.fillText(pontuacao + " pontos", canvas.width/2, canvas.height/1.5);
	context.strokeText(pontuacao + " pontos", canvas.width/2, canvas.height/1.5);
	context.restore();
}

document.onkeydown = function (key) {
	switch (key.which) {
		case ENTER:
			if (!started)
				iniciar();
			else {
				if ( player1.morto && liberado) {
					animacao.sprites = [];
					colisor.sprites = [];
					pontuacao = 0;
					player1.initialConfig();
					stage1.initialConfig();
					animacao.novoSprite(stage1);
					animacao.novoSprite(player1);
					colisor.novoSprite(player1);
					updateVidas();
					animacao.ligar();
					updatePontuacao();
					liberado = false;
				}
			}
			break;
		case ESPACO:
		case SETA_ESQUERDA:
		case SETA_DIREITA:
		case SETA_ACIMA:
		case SETA_ABAIXO:
			key.preventDefault();
	}
};

volumeBar.addEventListener('input', function () {
	if (!started) 
		sons.menu.volume = volumeBar.value/100;
	else
		sons.in_game.volume = volumeBar.value/400;
}, false);

function updatePontuacao () {
	document.getElementById('scoreCounter').innerText = pad(pontuacao);
}

function updateVidas () {
	document.getElementById('counter').innerText = player1.vidas;
}

function pad(num) {
  var s = "0000000" + num;
  return s.substr(s.length-7);
}

