(function () {
	"use strict"

	let canvas = document.getElementById('td-canvas'),
		context = canvas.getContext('2d'),
		container = document.getElementById('game-div'),
		showGrid = false,
		hour = new Date().getHours(),
		minutes = new Date().getMinutes(),
		alpha = 0,
		lastTime = new Date();

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
			context.clearRect(0,0,canvas.width, canvas.height);
			clock();
			daylight();
			context.save();
			context.font="2em Arial";
			context.fillStyle='red';
			context.strokeStyle="gray";
			context.fillText(pad(hour, 2) + ":" + pad(minutes, 2), canvas.width - 90, 50);
			context.strokeText(pad(hour, 2) + ":" + pad(minutes, 2), canvas.width - 90, 50);
			context.restore();
			if (showGrid) {
				drawBoard();
			}
			gameLoop();
		});
	}

	function daylight() {
		context.save();
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(canvas.width, 0);
		context.lineTo(canvas.width, canvas.height);
		context.lineTo(0, canvas.height);
		context.lineTo(0, 0);

/*
		context.moveTo(100, 150);
		context.arc(100, 150, 90, 0, 2 * Math.PI, true);

		context.moveTo(500, 600);
		context.arc(500, 600, 90, 0, 2 * Math.PI, true);
*/
		context.closePath();

		context.globalAlpha = alpha;

		context.fill();
		context.restore();
	}

	function insertAHero() {
		let selected = document.querySelectorAll('.selected.hero')[0],
			image = new Image();
			image.src= "assets/icons/archer.png";

		context.drawImage(image, 100, 100);
	}

	function clock() {
		if ( +lastTime + 300 > +new Date() ) return;
		lastTime = new Date();
		minutes++;
		if (minutes === 60) {
			minutes = 0;
			if (hour === 23) {
				hour = 0;
			} else {
				hour ++;
			}
		}

		if (hour > 19 || 3 > hour ) {
			alpha += 0.0035;
			if (alpha > 1 ) {
				alpha = 1;
			}
		} else {
			if (alpha != 0) {
				alpha -= 0.005;
			}
			if (alpha < 0 ) {
				alpha = 0;
			}
		}
	}


	setup();
	gameLoop();
	
} ());