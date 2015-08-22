(function (document) {
	var canvas = document.getElementById('game-canvas');
	var context = canvas.getContext('2d');
	var assets = {
		imagens : {
			player: 'robinMoody.png',
			skeleton: 'skeleton.png',
			flechasCima: 'arrow_up.png',
			flechasBaixo: 'arrow_down.png',
			flechasEsquerda: 'arrow_left.png',
			flechasDireita: 'arrow_right.png',
			hud: 'robinMoody-face.png',
			healMagic: 'heal_magic.png',
			hasteMagic: 'haste_magic.png'

		},
		sons: {
			atirar: 'disparo.mp3',
			dano: 'dano.mp3',
			haste: 'haste.mp3',
			hasteMagic: 'haste-magic.mp3',
			healMagic: 'heal.mp3'

		},
		sprites: []
	};
	var colisor = new Colisor();
	context.assets = assets;
	context.colisor = colisor;	
	context.shadowOff = function () {
		this.shadowBlur = 0;
		this.shadowOffsetX = 0;
		this.shadowOffsetY = 0;
	};
	var ultimoInimigo = new Date();
	var pausa = false, comecou = false, gameName = "Robin\nMoody!";
	var teclado = new Teclado(document), start = 2000;
	var player;

	function canvasConfig() {
      //context.shadowColor = 'rgba(68, 68, 68, 0.55)';
      context.shadowBlur = 3;
      context.shadowOffsetX = 10;
      context.shadowOffsetY = 3;
	};


	function load() {
		var totalMidia = 0, carregadas = 0;

		for (var i in assets.imagens) {
		  var img = new Image();
		  img.src = 'imagens/' + assets.imagens[i];
		  img.onload = loadingGame;
		  totalMidia++;
		  assets.imagens[i] = img;
		}

		for (var i in assets.sons) {
	      var snd = new Audio();
	      snd.src = 'sons/' + assets.sons[i];
	      snd.addEventListener('loadeddata', loadingGame, false);
	      snd.load();
	      totalMidia++;
	      
	      assets.sons[i] = snd;
	   }

		function loadingGame() {
			context.save();
			context.clearRect(0,0, canvas.width, canvas.height);
			carregadas++;
			var tamanhoTotal = context.canvas.width * .9;
			var tamanho = carregadas / totalMidia * tamanhoTotal;
			context.fillStyle = 'rgba(94, 211, 69, .8)';
			context.fillRect((context.canvas.width - tamanhoTotal)/2, context.canvas.height/1.2, tamanho, 30);
			drawText(gameName, {x: context.canvas.width/2, y: context.canvas.height/3.5});
			context.restore();

			if (carregadas == totalMidia) {
				context.clearRect(0,0, canvas.width, canvas.height);
				drawText(gameName, {x: context.canvas.width/2, y: context.canvas.height/3.5});
				drawText("Press Enter", {x: context.canvas.width/2, y: context.canvas.height/1.2}, '5em PiecesOfEight');

				teclado.disparou(ENTER, iniciar);

				document.addEventListener("touchstart", iniciar, false);
			}
		};
	};

	function iniciar(evento) {
		if (! comecou) {
			comecou = true;
			canvasConfig();
			startGame();
			loop();
			document.removeEventListener("touchstart", iniciar, false);
			document.addEventListener("touchstart", mobileVersion.bind(evento), false);
		} else {
			pausa = ! pausa;
			if (! pausa) {
				loop();
			} else {
				jogoPausado();
			}
		}
	};

	function mobileVersion(evento) {
		evento.touches[0].pageX > window.innerWidth/2 ? p.direcao = comandos.ataques.arco.DIREITA : p.direcao = comandos.ataques.arco.ESQUERDA;							
	};

	function startGame() {
		p = new Player(context, assets.imagens.player);
		assets.sprites.push(p);
		generateEnemies();

		teclado.disparou(SETA_ESQUERDA, function () {
			if (pausa) return;
			p.direcao = comandos.ataques.arco.ESQUERDA;
		});

		teclado.disparou(SETA_ACIMA, function () {
			if (pausa) return;
			p.direcao = comandos.ataques.arco.COSTAS;
		});

		teclado.disparou(SETA_ABAIXO, function () {
			if (pausa) return;
			p.direcao = comandos.ataques.arco.FRENTE;
		});

		teclado.disparou(SETA_DIREITA, function () {
			if (pausa) return;
			p.direcao = comandos.ataques.arco.DIREITA;
		});

		teclado.disparou(ESPACO, function (e) {
			if (pausa) return;
			p.atirar();
			e.preventDefault();
		});

		teclado.disparou(NUM1, function (e) {
			if (pausa) return;
			p.heal();
			e.preventDefault();
		});

		teclado.disparou(NUM2, function (e) {
			if (pausa) return;
			p.haste();
			e.preventDefault();
		});

	};

	function jogoPausado() {
		drawText("paused", {x: canvas.width/2, y: canvas.height/2});
	};

	function drawText(string, location, font) {
		var lines = string.split("\n");

		for (var i = 0; i <lines.length; i++) {
			context.save();
			context.font = font || '10em PiecesOfEight';
			context.fillStyle = "gold";
			context.strokeStyle = "black";
		    context.textAlign = 'center';
		    context.fillText(lines[i], location.x, location.y + (140 * i));
		    context.strokeText(lines[i], location.x, location.y + (140 * i));
		    context.restore();
		}
	};

	function loop() {
		requestAnimationFrame(function() {
			if (pausa) return;
			context.clearRect(0,0,canvas.width,canvas.height);
         	colisor.processar();
			for (var sprite of assets.sprites) {
				sprite.atualizar();
         		sprite.desenhar();
         	}
         	var novos = [], colisores = [];
         	for (var sprite of assets.sprites) {
				if (! sprite.excluir ) {
					novos.push(sprite);
					colisores.push(sprite);
				} else {
					delete sprite;
				}
         	}
         	assets.sprites = novos;
         	colisor.sprites = colisores;
			generateEnemies();
			loop();
      	});
	};

	function generateEnemies() {
		var agora = new Date();
        if (agora - ultimoInimigo < start) return;
		if (start > 1000 ) start -= 50;
        ultimoInimigo = agora;
		var enemy = new Enemy(context, assets.imagens.skeleton);
		assets.sprites.push(enemy);
		colisor.sprites.push(enemy);
	}
	load();


})(document);