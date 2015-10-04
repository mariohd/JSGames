(function () {
	"use strict"

	let canvas = document.getElementById('td-canvas'),
		context = canvas.getContext('2d'),
		container = document.getElementById('game-div'),
		showGrid = false,
		hour = new Date().getHours(),
		minutes = new Date().getMinutes(),
		alpha = 0,
		lastTime = new Date(),
		assets = {
			images: {
				Archer: 'archer.png',
				Swordsman: 'swordsman.png',
				Pikemen: 'pikemen.png',
				Healer: 'healer.png',
				Mage: 'mage.png',
				Knight: 'knight.png'
			},
			sounds: {

			}
		},
		armies = {
			player: new Matrix(4, 6),
			projectiles: [],
			enemies: []
		};

	function load() {
		var midia = 0, loaded = 0;

		for (var i in assets.sounds) {
	      var snd = new Audio();
	      snd.src = 'assets/sounds/' + assets.sons[i];
	      snd.addEventListener('loadeddata', loadingGame, false);
	      snd.load();
	      midia++;
	      
	      assets.sounds[i] = snd;
		}

		for (var i in assets.images) {
		  var img = new Image();
		  img.src = 'assets/images/' + assets.images[i];
		  img.onload = loadingGame;
		  midia++;
		  assets.images[i] = img;
		}

		function loadingGame() {
			context.save();
			context.clearRect(0,0, canvas.width, canvas.height);
			loaded++;
			var fullSize = context.canvas.width * .9;
			var actualSize = loaded / midia * fullSize;
			context.fillStyle = 'rgba(94, 211, 69, .8)';
			context.fillRect((context.canvas.width - fullSize)/2, context.canvas.height/1.2, actualSize, 30);
			context.restore();

			if (loaded == midia) {
				context.clearRect(0,0, canvas.width, canvas.height);
			}
		};
	};

	function drawBoard() {
		function drawLine(x1, y1, x2, y2, alpha) {
			context.save();
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
	        context.globalAlpha = alpha || .3;
			context.stroke();
			context.closePath();
			context.restore();
		};

		let parts = 12,
			widthPart = canvas.width/parts,
			heightPart = canvas.height/4;
		for (let i = 0; i <= parts/2; i++ ) {
			drawLine(widthPart * i, 0, widthPart * i, canvas.height);
		}
		for (let i = 1; i <= 4; i++ ) {
			drawLine(0, heightPart * i, canvas.width, heightPart * i);
		}

	};

	function setup() {

		canvas.width = window.innerWidth * .85;
		canvas.height = window.innerHeight * .85;
		container.style.width = window.innerWidth * .85;
		context.projectiles = armies.projectiles;
		load();

		let heroes = document.querySelectorAll('.hero');
		for (let hero of heroes) {
			hero.addEventListener('click', function () {
				let previous = document.querySelectorAll('.selected.hero')[0];
				if (previous) {
					previous.removeClass('selected');
				}
				if (this !== previous)
				this.className += ' selected';
			});

			hero.addEventListener("mouseover", function () {
				tooltip.pop(hero, '#' + hero.id + '-tooltip', {position: 0, smartPosition: false});
			});
		}

		canvas.addEventListener("mouseover", function () {
			let selected = document.querySelectorAll('.selected.hero')[0];
			if (selected) {
				showGrid = true;
			}
		});

		canvas.addEventListener("mouseout", function() {
			showGrid = false;
		});

		canvas.addEventListener('click', function(click) {
			let x = click.offsetX? (click.offsetX): click.pageX - this.offsetLeft,
				y = click.offsetY? (click.offsetY): click.pageY - this.offsetTop,
				location = {column: parseInt(x / (canvas.width/12)), row: parseInt(y / (canvas.height/4)) };

			let selected = document.querySelectorAll('.selected.hero')[0],
				heroType = window[selected.getAttribute('data-hero')];

			let position = {
				x: (canvas.width/12 * location.column) + canvas.width/24,
				y: (canvas.height/4 * location.row) + canvas.height/8
			}
			armies.player[location.row][location.column] = new heroType(context, assets.images[heroType.name], position);
		});
	} 

	function gameLoop() {
		requestAnimationFrame(function () {
			context.clearRect(0,0,canvas.width, canvas.height);

			drawArmies();

			if (showGrid) {
				drawBoard();
			}
			
			gameLoop();
		});
	}

	function drawArmies() {
	
		armies.player.forEach(function (row) {
			row.forEach(function (hero) {
				hero.draw();
			});
		});

		armies.projectiles.clean(undefined);

		armies.projectiles.forEach(function (p, i) {
			if (! p.erase) {
				p.draw();
			} else {
				armies.projectiles[i] = undefined;
			}
		});
	}

	setup();
	gameLoop();
	
} ());