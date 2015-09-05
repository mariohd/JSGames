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
			hasteMagic: 'haste_magic.png',
			fireball: 'fireball.png',
			heal: 'heal.png',
			haste: 'haste.png',
			skeleton_kit: 'skeleton-kit.png',
			skull: 'skull.png'
		},
		sons: {
			theme: 'mainTheme.ogg',
			atirar: 'disparo.mp3',
			dano: 'dano.mp3',
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
	context.gameOver = false;

	var ultimoInimigo = new Date();
	var pausa = false, comecou = false, gameName = "Robin\nMoody!";
	var teclado = new Teclado(document), start = 2000, player;

	var remoteData = new RemoteData(
		"pgKpGopbcKDtDIU2GpDaPxcUNae97i2HXSH8SyeG", 
		"1UJYXBiViW1bx8F7Ds8Cdn5AVQ8BGNpl2Kz9eLPo");

	context.skulls = Number.POSITIVE_INFINITY;
	context.deadSkulls = 0;

	var lastRun = new Date().getTime();

	function canvasConfig() {
      context.shadowColor = 'rgba(68, 68, 68, 0.55)';
      context.shadowBlur = 5;
      context.shadowOffsetX = 8;
      context.shadowOffsetY = 3;
	};


	function load() {
		var totalMidia = 1, carregadas = 0;

		for (var i in assets.sons) {
	      var snd = new Audio();
	      snd.src = 'sons/' + assets.sons[i];
	      snd.addEventListener('loadeddata', loadingGame, false);
	      snd.load();
	      totalMidia++;
	      
	      assets.sons[i] = snd;
		}

		for (var i in assets.imagens) {
		  var img = new Image();
		  img.src = 'imagens/' + assets.imagens[i];
		  img.onload = loadingGame;
		  totalMidia++;
		  assets.imagens[i] = img;
		}

		remoteData.robinMoody.getSkulls(function (value) {
			context.skulls = value;
			context.releasedSkulls = value;
			loadingGame();
		});

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
			assets.sons.theme.volume = .2;
			assets.sons.theme.loop = true;
			assets.sons.theme.play();
			document.removeEventListener("touchstart", iniciar, false);
			document.addEventListener("touchstart", mobileVersion.bind(evento), false);
		} else {
			if (context.gameOver) {
				assets.sprites = assets.sprites.filter(function (f) {
					return f instanceof Player;
				});
				player.hp = 100;
				player.mana = 100;
				player.vidas = 3;
				context.deadSkulls = 0;
				context.releasedSkulls = context.skulls;
				context.gameOver = false;
				loop();
			} else {
				pausa = ! pausa;
				if (! pausa) {
					assets.sons.theme.play();
					loop();
				} else {
					jogoPausado();
				}
			}
		}
	};

	function mobileVersion(evento) {
		evento.touches[0].pageX > window.innerWidth/2 ? player.direcao = comandos.ataques.arco.DIREITA : player.direcao = comandos.ataques.arco.ESQUERDA;
	};

	function startGame() {
		player = new Player(context, assets.imagens.player);
		assets.sprites.push(player);
		generateEnemies();

		teclado.disparou(SETA_ESQUERDA, function () {
			if (pausa || context.gameOver) return;
			player.direcao = comandos.ataques.arco.ESQUERDA;
		});

		teclado.disparou(SETA_ACIMA, function () {
			if (pausa || context.gameOver) return;
			player.direcao = comandos.ataques.arco.COSTAS;
		});

		teclado.disparou(SETA_ABAIXO, function () {
			if (pausa || context.gameOver) return;
			player.direcao = comandos.ataques.arco.FRENTE;
		});

		teclado.disparou(SETA_DIREITA, function () {
			if (pausa || context.gameOver) return;
			player.direcao = comandos.ataques.arco.DIREITA;
		});

		teclado.disparou(ESPACO, function (e) {
			if (pausa || context.gameOver) return;
			player.atirar();
			e.preventDefault();
		});

		teclado.disparou(NUM1, function (e) {
			if (pausa || context.gameOver) return;
			player.heal();
			e.preventDefault();
		});

		teclado.disparou(NUM2, function (e) {
			if (pausa || context.gameOver) return;
			player.haste();
			e.preventDefault();
		});

	};

	function jogoPausado() {
		drawText("paused", {x: canvas.width/2, y: canvas.height/2});
		assets.sons.theme.pause();
	};

	function gameOver() {
		context.drawImage(assets.imagens.skeleton_kit, canvas.width/2 - assets.imagens.skeleton_kit.width/2, canvas.height/1.8 - assets.imagens.skeleton_kit.height * 3/4 );
		drawText("Game Over", {x: canvas.width/2, y: canvas.height * 3/8});
		drawText("You added a new enemy skeleton!", {x: canvas.width/2, y: canvas.height * 5/8}, '4em PiecesOfEight');
		drawText("Press Enter to restart", {x: canvas.width/2, y: canvas.height * 7/8}, '4em PiecesOfEight');
	};

	function victory() {
		context.drawImage(assets.imagens.skeleton_kit, canvas.width/2 - assets.imagens.skeleton_kit.width/2, canvas.height/1.8 - assets.imagens.skeleton_kit.height * 3/4 );
		drawText("Victory!", {x: canvas.width/2, y: canvas.height * 3/8});
		drawText("Press Enter to restart", {x: canvas.width/2, y: canvas.height * 7/8}, '4em PiecesOfEight');
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
			if (context.gameOver) {
				gameOver();
				return;
			}

			if (context.deadSkulls == context.skulls) {
				skullsCounter();
				victory();
				context.gameOver = true;
				return;
			}

			context.clearRect(0,0,canvas.width,canvas.height);

			skullsCounter();

			fpsCounter();

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

	function fpsCounter() {
		context.save();
		context.shadowOff();
		var delta = (new Date().getTime() - lastRun)/1000;
        lastRun = new Date().getTime();
        context.fillText((1/delta).toPrecision(3) + " fps", canvas.width - 40, 20);
        context.restore();
	};

	function generateEnemies() {
		var agora = new Date();
        if (agora - ultimoInimigo < start) return;
		if (start > 1000 ) start -= 50;
		if (! context.releasedSkulls) return;
		context.releasedSkulls --;
        ultimoInimigo = agora;
		var enemy = new Enemy(context, assets.imagens.skeleton);
		assets.sprites.push(enemy);
		colisor.sprites.push(enemy);
	};

	function skullsCounter() {
		context.save();
		context.shadowOff();
		context.clearRect(canvas.width - 200, 50, canvas.width - 90, (assets.imagens.skull.height) + 40 );
		context.drawImage(assets.imagens.skull, canvas.width - 200, 50);
		drawText('x ' + (context.skulls - context.deadSkulls), { x: canvas.width - 90, y: (assets.imagens.skull.height) + 40 }, '50px PiecesOfEight');
		context.restore();
	};
	load();
})(document);