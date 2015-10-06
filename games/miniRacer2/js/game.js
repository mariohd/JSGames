'use strict';

(function () {
	var canvas = document.getElementById('game-canvas'),
	    context = canvas.getContext('2d'),
	    squareSize = 0,
	    lane = 1,
	    cars = [],
	    gap = 1000,
	    lastCar = new Date(),
	    defaultSpeed = 10,
	    lastAcelereted = new Date(),
	    lanes = [0, 1, 1],
	    combinations = [[0, 1, 1], [2, 0, 2], [2, 0, 0], [1, 0, 1], 
	    				[2, 0, 2], [0, 0, 2], [0, 1, 0], [2, 0, 2], 
	    				[0, 0, 1], [2, 2, 1], [1, 1, 2], [2, 1, 2], 
	    				[1, 2, 1], [0, 1, 1], [0, 2, 2], [1, 0, 2]],
	    gameOver = false;

	function setup() {
		canvas.width = parseInt(window.innerWidth * .98);
		canvas.height = parseInt(window.innerHeight * .98);
		squareSize = parseInt(window.orientation === window.LANDSCAPE? canvas.height/15 : canvas.width * 1/10);
		gameLoop();
	};

	function hud() {
		context.save();
		context.lineWidth = 3;
		context.strokeRect(0, 0, canvas.width, canvas.height);
		context.restore();
		if (window.debugMode) {
			context.moveTo(parseInt(canvas.width * (1/3)), 0);
			context.lineTo(parseInt(canvas.width * (1/3)), canvas.height);
			context.moveTo(parseInt(canvas.width * (2/3)), 0);
			context.lineTo(parseInt(canvas.width * (2/3)), canvas.height);
			context.stroke();
		}
	};

	function me(lane) {
		function square(x, y, space) {
			space = space || 0;
			context.rect(x, y, squareSize - 2 * space, squareSize - 2 * space);
		};

		var x = parseInt((canvas.width * 1/6 - squareSize/2) + (lane * canvas.width * 1/3));

		context.beginPath();
		square(x, parseInt(canvas.height - 4 * squareSize));
		square(x, parseInt(canvas.height - 3 * squareSize));
		square(x, parseInt(canvas.height - 2 * squareSize));
		square(x - squareSize, parseInt(canvas.height - squareSize));
		square(x + squareSize, parseInt(canvas.height - squareSize));
		square(x - squareSize, parseInt(canvas.height - 3 * squareSize));
		square(x + squareSize, parseInt(canvas.height - 3 * squareSize));
		context.stroke();
		context.closePath();

		context.beginPath();
		var space = squareSize/10;
		square(x + space, parseInt(canvas.height - 4 * squareSize + space), space);
		square(x + space, parseInt(canvas.height - 3 * squareSize + space), space);
		square(x + space, parseInt(canvas.height - 2 * squareSize + space), space);
		square(x - squareSize + space, parseInt(canvas.height - squareSize + space), space);
		square(x + squareSize + space, parseInt(canvas.height - squareSize + space), space);
		square(x - squareSize + space, parseInt(canvas.height - 3 * squareSize + space), space);
		square(x + squareSize + space, parseInt(canvas.height - 3 * squareSize + space), space);
		context.fill();
		context.closePath();
	};

	function car(lane, height) {
		function square(x, y, space) {
			space = space || 0;
			context.rect(x, y, squareSize - 2 * space, squareSize - 2 * space);
		};

		var x = parseInt((canvas.width * 1/6 - squareSize/2) + (lane * canvas.width * 1/3));

		context.beginPath();
		square(x, parseInt(height - 4 * squareSize));
		square(x, parseInt(height - 3 * squareSize));
		square(x, parseInt(height - 2 * squareSize));
		square(x - squareSize, parseInt(height - squareSize));
		square(x + squareSize, parseInt(height - squareSize));
		square(x - squareSize, parseInt(height - 3 * squareSize));
		square(x + squareSize, parseInt(height - 3 * squareSize));
		context.stroke();
		context.closePath();

		context.beginPath();
		var space = squareSize/10;
		square(x + space, parseInt(height - 4 * squareSize + space), space);
		square(x + space, parseInt(height - 3 * squareSize + space), space);
		square(x + space, parseInt(height - 2 * squareSize + space), space);
		square(x - squareSize + space, parseInt(height - squareSize + space), space);
		square(x + squareSize + space, parseInt(height - squareSize + space), space);
		square(x - squareSize + space, parseInt(height - 3 * squareSize + space), space);
		square(x + squareSize + space, parseInt(height - 3 * squareSize + space), space);
		context.fill();
		context.closePath();
	}

	var lastMeasure = +new Date();
	function handleOrientation (event) {
		var side = event.accelerationIncludingGravity.x,
			degrees = 2.5;
		if (new Date() > +lastMeasure + 100) {
		lastMeasure = new Date();
		if (-degrees > side) {
			lane = 2;
		} else {
			if (side > -degrees && side < degrees) {
				lane = 1;
			} else {
				lane = 0;
			}
		}
		}
	};

	function gameLoop() {
		requestAnimationFrame(function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			draw();
			gameLoop();
		});
	};

	function draw() {
		hud();
		me(lane);
		if (! gameOver) {
			cars.forEach(function (pilot) {
				car(pilot.lane, pilot.height);
				pilot.height += defaultSpeed;

				if (pilot.height > canvas.height - 4 * squareSize && pilot.lane === lane) {
					gameOver = true;
				}
			});
			if (+new Date() > +lastCar ) {
				lastCar = +new Date() + gap;

				cars.push({
					lane: lanes.shift(),
					height: - 4 * squareSize,
				});

				if (lanes.length < 6) {
					var combination = combinations[Math.floor(Math.random()*combinations.length)];
					lanes = lanes.concat(combination);
				}
			}

			if (+new Date() > +lastAcelereted) {
				lastAcelereted = +new Date() + 2 * gap;
				defaultSpeed += 1;
			}

			cars = cars.filter(function (pilot) {
				return canvas.height > pilot.height - (4 * squareSize);
			});
		} else {
			context.font = '10em TETRIS';
			context.textAlign = 'center';
			context.fillText("Game Over", canvas.width/2, canvas.height * 1/4);
		}

	};

	function restart() {
		cars = [];
		lane = 1;
		defaultSpeed = 10;
		gameOver = false;
	}

	function resize () {
		setup();
	}

	window.LANDSCAPE = 1;
	window.PORTRAIT = 0;
	if ( window.orientation === undefined ) {
		window.orientation =
			(function () {
				return window.innerHeight > window.innerWidth? window.PORTRAIT : window.LANDSCAPE;
			})();
	}
	window.addEventListener('resize', resize);
	window.debugMode = false;

	window.addEventListener('devicemotion', handleOrientation);

	window.addEventListener('touchstart', function () {
		if (gameOver) {
    		restart();
    	}	
	});

	window.addEventListener('keydown', function (key) {
		if (! gameOver) {
			switch(key.keyCode) {
				case 39:
					if (lane < 2)
						lane += 1;
					break;
				case 37:
					if (lane > 0)
						lane -= 1;
					break;	
			}
		} else {
			restart();
		}
	});

	setup();
})();

if ( ! window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

				window.setTimeout( callback, 1000 / 60 );

			};

	} )();
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
