	function PlayerCar() {
		this.context = undefined,
		this.height= 120,
		this.line= 100;
		this.score = 0;
	}

	PlayerCar.prototype._buildCar = function (line) {
		var squareSize = 7,
			left = (squareSize * 1),
			center = (squareSize * 2),
			right = (squareSize * 3);

		//car head
		this.context.rect(center + line, this.height, squareSize, squareSize);
		this.context.rect(left + line, this.height + squareSize, squareSize, squareSize);
		this.context.rect(center + line, this.height + squareSize, squareSize, squareSize);
		this.context.rect(right + line, this.height + squareSize, squareSize, squareSize);
		//car body
		this.context.rect(center + line, this.height + (squareSize * 2), squareSize, squareSize);
		//car wings
		this.context.rect(left + line, this.height + (squareSize * 3), squareSize, squareSize);
		this.context.rect(right + line, this.height + (squareSize * 3), squareSize, squareSize);

		this.context.fillStyle = '#888888';
		this.context.fill();
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;
		this.context.stroke();
	};

	PlayerCar.prototype.init = function (canvas) {
		this.context = canvas.getContext("2d");
		this._buildCar(this.line);
		return this;
	};

	function ReverseCar() {
		this.context = undefined,
		this.height = 0,
		this.line= 100;
		this.speed = 0.1;
		this.lines = [0, 30, 60];
	};

	ReverseCar.prototype.init = function (canvas) {
		this.context = canvas.getContext("2d");
		this.line = this.lines[Math.floor(Math.random() * (2 - 0 + 1)) ];
		return this;
	};

	ReverseCar.prototype._buildCar= function () {
		var squareSize = 7,
			left = (squareSize * 1),
			center = (squareSize * 2),
			right = (squareSize * 3);

		this.context.rect(center + this.line, this.height , squareSize, squareSize);
		this.context.rect(left + this.line, this.height + squareSize, squareSize, squareSize);
		this.context.rect(center + this.line, this.height + squareSize, squareSize, squareSize);
		this.context.rect(right + this.line, this.height + squareSize, squareSize, squareSize);
		this.context.rect(center + this.line, this.height + (squareSize * 2), squareSize, squareSize);
		this.context.rect(left + this.line, this.height + (squareSize * 3), squareSize, squareSize);
		this.context.rect(right + this.line, this.height + (squareSize * 3), squareSize, squareSize);

		this.context.fillStyle = '#888888';
		this.context.fill();
		this.context.strokeStyle = 'black';
		this.context.lineWidth = 2;
		this.context.stroke();
		if (miniRacer.running){
			if(this.height > 100){
				if (miniRacer.line == this.line) {
					miniRacer.running = false;
					console.log("Your escore in MiniRacer is " + miniRacer.playerCar.score + ".");
					alert("Your escore in MiniRacer is " + miniRacer.playerCar.score + ".");
				}
			}

			if (this.height > 145){
				this.height = -10;
				this.line = this.lines[Math.floor(Math.random() * (this.lines.length + 1))];
				miniRacer.playerCar.score += 1;
			} else {
				this.height += this.speed;
				this.speed += .001;
			}
		}
	};

	ReverseCar.prototype._resetCar = function (){
		this.height = 0;
		this.speed = Math.random();
		this.line = this.lines[Math.floor(Math.random() * (2 - 0 + 1)) ];
	};

var miniRacer = ({
		context: null,
		canvas: null,
		LEFTLINE: 0,
		CENTERLINE: 30,
		RIGHTLINE: 60,
		quantityEnemyCars: 0,
		heightReverseCars: 0,
		playerCar: null,
		reverseCars: [],
		running: true,

	changeLine: function (event) {
		switch(event.keyCode) {
			case 97: // A
				if (miniRacer.running){
					switch(this.line) {
						case this.LEFTLINE:
							break;
						case this.CENTERLINE:
							this.line = this.LEFTLINE;
							break;
						case this.RIGHTLINE:
							this.line = this.CENTERLINE;
							break;
					}
					this._clearCanvas();
					this.playerCar._buildCar(this.line);
					for (i = 0; i < miniRacer.reverseCars.length; i++) {
						this.reverseCars[i]._buildCar();
					}
				}
				break;
			case 100: // D
				if (miniRacer.running){
					switch(this.line) {
						case this.LEFTLINE:
							this.line = this.CENTERLINE;
							break;
						case this.CENTERLINE:
							this.line = this.RIGHTLINE;
							break;
						case this.RIGHTLINE:
							break;
					}
					this._clearCanvas();
					this.playerCar._buildCar(this.line);
					for (i = 0; i < miniRacer.reverseCars.length; i++) {
						this.reverseCars[i]._buildCar();
					}
				}
				break;

				case 114: // R
					this._clearCanvas();
					this.playerCar._buildCar(this.line);
					for (i = 0; i < miniRacer.reverseCars.length; i++) {
						this.reverseCars[i]._resetCar();
					}
					miniRacer.playerCar.score = 0;
					miniRacer.running = true;
					break;
			default: return;
		}

	},

	_clearCanvas: function() {
		this.context.beginPath();
		this.context.clearRect(0 ,0, this.canvas.width, this.canvas.height );
	},

	_clearCanvasTop: function(width, height) {
		this.context.beginPath();
		this.context.clearRect(0 ,0, width, height );
	},

	_startMoviment: function() {
		setInterval(function() {
			miniRacer._clearCanvas();
			miniRacer.playerCar._buildCar(miniRacer.line);
			for (i = 0; i < miniRacer.reverseCars.length; i++) {
					miniRacer.reverseCars[i]._buildCar();
			}
		}, 15);

		setInterval(function () {
			if (miniRacer.quantityEnemyCars < 2){
				miniRacer.reverseCars.push(new ReverseCar().init(miniRacer.canvas));
				miniRacer.quantityEnemyCars += 1;
			}
			if (miniRacer.quantityEnemyCars == 2){
				clearInterval(this);
			}
		}, 3000);

	},

	init: function () {
		this.canvas = document.getElementById("miniRacerCanvas");
		this.context = this.canvas.getContext("2d");
		this.line = this.CENTERLINE,
		this.playerCar = new PlayerCar().init(this.canvas);
		this._startMoviment();
		return this;
	}

}).init();


var canvas = document.getElementById("miniRacerCanvas");
canvas.focus();

canvas.addEventListener('keypress', function(e){
	miniRacer.changeLine(e);
});
