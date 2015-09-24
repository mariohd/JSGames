(function () {
	"use strict"

	let canvas = document.getElementById('td-canvas'),
		context = canvas.getContext('2d'),
		container = document.getElementById('game-div'),
		showGrid = false;

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
				y = click.offsetY? (click.offsetY): click.pageY - this.offsetTop;

			let selected = document.querySelectorAll('.selected.hero')[0];
			
		});
	} 

	function gameLoop() {
		requestAnimationFrame(function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			if (showGrid) {
				drawBoard();
			}
			gameLoop();
		});
	}

	function insertAHero() {
		let selected = document.querySelectorAll('.selected.hero')[0],
			image = new Image();
			image.src= "assets/icons/archer.png";

		context.drawImage(image, 100, 100);
	}


	setup();
	gameLoop();
	
} ());