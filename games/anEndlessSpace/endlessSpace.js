function spaceShip() {
  this.sprite;
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  this.position = { width : (this.maxPosition.width - this.minPosition.width)/2 , height: (this.maxPosition.height - this.minPosition.height)};
  this.speed = 10;
  this.init();
};

spaceShip.prototype.init = function () {
  this.sprite = new Image();
  this.sprite.classList.add('spaceship');
  this.sprite.src = 'ship/ship.png';
};

spaceShip.prototype.build = function (context) {
  context.drawImage(this.sprite, this.position.width, this.position.height, this.sprite.width/2.5, this.sprite.height/2.5);
};

spaceShip.prototype.action = function (key) {
	switch(key.which) {
		case 'a'.charCodeAt(0):
		case 'A'.charCodeAt(0):
		case 37:	// arrow left
			if (this.minPosition.width < this.position.width - this.speed)
				this.position.width -= this.speed;
			break;
		case 'w'.charCodeAt(0):
		case 'W'.charCodeAt(0):
		case 38:	//arrow up
			if (this.minPosition.height < this.position.height - this.speed)
				this.position.height -= this.speed;
			break;
		case 'd'.charCodeAt(0):
		case 'D'.charCodeAt(0):
		case 39: 	// arrow right
			if (this.maxPosition.width > this.position.width + this.speed)
				this.position.width += this.speed;
			break;
		case 's'.charCodeAt(0):
		case 'S'.charCodeAt(0):
		case 40:	// arrow down
			if (this.maxPosition.height > this.position.height + this.speed)
				this.position.height += this.speed;
			break;
	}
};

var endlessSpace = ({
  stages: [],
  currentStage: 0,
  canvas: null,
  context: null,
  timer: null,
  ship: null,
  refreshInterval: null,

  init: function () {
    this.canvas = document.getElementById('endlessCanvas');
    this.context = this.canvas.getContext("2d");
	this.context.canvasWidth = this.canvas.scrollWidth;
	this.context.canvasHeight = this.canvas.scrollHeight;
    this.stages = 
		[new StageOne('background/stageOne.jpg', 0, this.canvas.height), 
		 new StageTwo('background/stageTwo.jpg', 0, this.canvas.height)];
	this.timer = new ClockCounter();
	this.ship = new spaceShip();
    this.onReady();
    return this;
  },
  
  isReady: function () {
	return this.stages[this.currentStage].isReady;
  },

  onReady: function () {
	var self = this, loadingText = 'Loading...';
	var id = setInterval(function () {
			if (self.isReady()) {
				clearInterval(id);
				self.refreshScreen();
				self.timer.startCronometer();
			} else {
				self.clearCanvas();
				self.context.save();
				self.context.fillStyle = "black";
				self.context.font = "23px Guardians";
				self.context.textAlign = 'center';
				self.context.fillText(loadingText, self.context.canvasWidth/2, self.context.canvasHeight/2 );
				self.context.restore();
			}
		},  parseInt(1000/60) - 1);
	},
	
	refreshScreen: function () {
		var self = this;
		this.refreshInterval = setInterval(function () {
			self.clearCanvas();
			self.stages[self.currentStage].build(self.context);
			self.ship.build(self.context);
		}, parseInt(1000/60) - 1);
	},
	
	nextStage: function () {
		clearInterval(this.refreshInterval);
		this.currentStage += 1;
		this.onReady();
	},
	
	clearCanvas: function () {
		this.context.clearRect(0 ,0, this.canvas.width, this.canvas.height );
	},
	
	action: function (key) {
		this.ship.action(key);
	}
}).init();

var endlessCanvas = document.getElementById("endlessCanvas");

endlessCanvas.focus();
endlessCanvas.onblur = function () {
	endlessCanvas.focus();
};

window.addEventListener('keydown', function (key) {
	endlessSpace.action(key);
}, true);
