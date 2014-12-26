function spaceShip() {
  this.sprite;
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  this.position = { width : (this.maxPosition.width - this.minPosition.width)/2 , height: (this.maxPosition.height - this.minPosition.height)};
  this.speed = 5;
  this.bullets = [];
  this.init();
};

spaceShip.prototype.init = function () {
  this.sprite = new Image();
  this.sprite.classList.add('spaceship');
  this.sprite.src = 'ship/ship.png';
};

spaceShip.prototype.build = function (context) {
  this.bullets.forEach(function (bullet) {
    bullet.build(context);
  });
  context.drawImage(this.sprite, this.position.width, this.position.height, this.sprite.width/2.5, this.sprite.height/2.5);
};

spaceShip.prototype.shot = function () {
  this.bullets = this.bullets.filter(function (bullet) {
    return bullet.height >  0;
  });
  var bullet = new Bullet(this.position.width + (this.sprite.width/6), this.position.height);
  this.bullets.push(bullet);
};

spaceShip.prototype.action = function (keys) {
  if(keys[37] || keys[65]) { // left
	   if (this.minPosition.width < this.position.width - this.speed) {
		     this.position.width -= this.speed;
     }
  }

  if(keys[38] || keys[87]) { // up
    if (this.minPosition.height < this.position.height - this.speed) {
      this.position.height -= this.speed;
    }
  }

  if(keys[39] || keys[68]) { // right
    if (this.maxPosition.width > this.position.width + this.speed) {
      this.position.width += this.speed;
    }
  }

  if(keys[40] || keys[83]) { // down
    if (this.maxPosition.height > this.position.height + this.speed) {
      this.position.height += this.speed;
    }
  }
};

function Bullet(width, height) {
  this.width = width;
  this.height = height;
  this.damage = 5;
  this.sprite = new Image();
  this.sprite.src = 'ship/bullet.png';
};

Bullet.prototype.build = function (context) {
  this.height -= 10;
  context.drawImage(this.sprite, this.width, this.height, this.sprite.width, this.sprite.height);
};

var azureStar = ({
  stages: [],
  currentStage: 0,
  canvas: null,
  context: null,
  timer: null,
  ship: null,
  refreshInterval: null,
  refreshRate: 15,
  keys: [],

  init: function () {
    this.loadingImage = new Image();
    this.loadingImage.src = 'background/loading.jpg';
    this.canvas = document.getElementById('azureCanvas');
    this.context = this.canvas.getContext("2d");
	  this.context.canvasWidth = this.canvas.scrollWidth;
	  this.context.canvasHeight = this.canvas.scrollHeight;
    this.stages =
		[new Stage('background/stageOne.jpg', 0, this.canvas.height, 0.6),
		 new Stage('background/stageTwo.jpg', 0, this.canvas.height, 0.6),
     new Stage('background/stageThree.jpg', 0, this.canvas.height, 1),
     new Stage('background/finalStage.jpg', 0, this.canvas.height, 1)];
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
				self.context.fillStyle = "#D30035";
				self.context.font = "23px Guardians";
				self.context.textAlign = 'center';
        self.context.drawImage(self.loadingImage, 0, 0);
				self.context.fillText(loadingText, self.context.canvasWidth/ 8, self.context.canvasHeight/ 1.1);
				self.context.restore();
			}
		},  this.refreshRate);
	},

	refreshScreen: function () {
		var self = this;
		this.refreshInterval = setInterval(function () {
			self.clearCanvas();
			self.stages[self.currentStage].build(self.context);
			self.ship.build(self.context);
      self.ship.action(self.keys);
		}, this.refreshRate);
	},

	nextStage: function () {
		clearInterval(this.refreshInterval);
		this.currentStage += 1;
		this.onReady();
	},

	clearCanvas: function () {
		this.context.clearRect(0 ,0, this.canvas.width, this.canvas.height );
	}
}).init();

var azureCanvas = document.getElementById("azureCanvas");

azureCanvas.focus();

azureCanvas.onblur = function () {
  azureCanvas.focus();
};

azureCanvas.onkeydown = function (key) {
  if (key.keyCode === 32 ) {
    key.preventDefault();
    azureStar.ship.shot();
  } else {
    azureStar.keys[key.which] = key.type == 'keydown';
  }
};

azureCanvas.onkeyup = function (key) {
  azureStar.keys[key.which] = key.type == 'keydown';
};
