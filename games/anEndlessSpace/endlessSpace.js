function SpaceShip() {
	this.sprite;
	this.position = { width : 60, height: 0};
	this.speed = 10;
	this.init();
};

SpaceShip.prototype.init = function () {
	this.sprite = new Image();
	this.sprite.src = 'ship/ship.png';
};

SpaceShip.prototype.build = function (context) {
	context.drawImage(this.sprite, this.position.width, this.position.height);
};

function SpaceBackground(imageURL, height, exibitionArea) {
	this.backgroundImage = new Image();
	this.initialHeight = height;
	this.currentHeight = this.initialHeight;
	this.currentWidth = this.initialHeight;
	this.exibitionArea = exibitionArea;
	this.speed = 1;
	this.isReady = false;
	var self = this;
	this.backgroundImage.onload = function () {
		self.isReady = true;
		};
	this.backgroundImage.src = imageURL;
};

SpaceBackground.prototype.build = function (context) {
	if (this.isReady) {
		if (parseInt(this.currentHeight) == this.initialHeight) {
			this.currentHeight = this.backgroundImage.height - this.exibitionArea;
		}
		context.drawImage(this.backgroundImage, 0, -this.currentHeight);
		this.currentHeight -= this.speed;
	}
};

var endlessSpace = ({
	background: null,
	canvas: null,
	context: null,

	init: function () {
		this.canvas = document.getElementById('endlessCanvas');
		this.context = this.canvas.getContext("2d");
		this.context.canvasWidth = this.canvas.scrollWidth;
		this.context.canvasHeight = this.canvas.scrollHeight;
		this.background = new SpaceBackground('background/space.jpg', 0, this.canvas.height);
		this.onReady();
		return this;
	},
  
	isReady: function () {
		return this.background.isReady;
	},

	onReady: function () {
		var self = this;
		var id = setInterval(function () {
				if (self.isReady()) {
					new ClockCounter().startCronometer();
					clearInterval(id);
					self.refreshScreen();
				} else {
					self.context.fillStyle = "blue";
					self.context.font = "bold 23px Arial";
					self.context.fillText("Loading...", self.context.canvasWidth/2.5, self.context.canvasHeight/2 );
				}
			}, 15);
	},
	
	refreshScreen: function () {
		var self = this;
		setInterval(function () {
			self.context.clearRect(0 ,0, self.canvas.width, self.canvas.height );
			self.background.build(self.context);
		}, parseInt(1000/60) - 1);
	},
}).init();
