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
  gameReady: false,

  init: function () {
    this.loadingImage = new Image();
    this.loadingImage.src = 'background/loading.jpg';
    this.canvas = document.getElementById('azureCanvas');
    this.context = this.canvas.getContext("2d");
	  this.context.canvasWidth = this.canvas.scrollWidth;
	  this.context.canvasHeight = this.canvas.scrollHeight;
    this.stages =
		[new Stage('background/witchBroomNebula.jpg', 'Witch Broom Nebula', this.canvas.height, 0.6),
		 new Stage('background/eagleNebula.jpg', 'Eagle Nebula', this.canvas.height, 0.6),
     new Stage('background/orionNebula.jpg', 'Orion Nebula', this.canvas.height, 1),
     new Stage('background/azureStar.jpg', 'Azure Star', this.canvas.height, 1)];
	  this.timer = new ClockCounter();
	  this.ship = new spaceShip();
    this.onReady();
    return this;
  },

  isLoaded: function () {
	   return this.stages[this.currentStage].isReady;
  },

  onReady: function () {
	var self = this, loadingText = 'Loading...', gameName = 'Azure Star', begin = 'Press Enter to begin';
	var id = setInterval(function () {
      self.clearCanvas();
      if (self.isLoaded()) {
        if (self.gameReady) {
          clearInterval(id);
          self.refreshScreen();
          self.timer.startCronometer();
        } else {
          self.context.drawImage(self.loadingImage, 0, 0);
          self.drawText(begin, self.context.canvasWidth/ 2, self.context.canvasHeight/ 1.1, '23px Guardians');
          self.drawText(gameName, self.context.canvasWidth/ 2, self.context.canvasHeight/ 5, '70px Guardians');
        }
			} else {
        self.context.drawImage(self.loadingImage, 0, 0);
				self.drawText(loadingText, self.context.canvasWidth/ 8, self.context.canvasHeight/ 1.1, '23px Guardians');
        self.drawText(gameName, self.context.canvasWidth/ 2, self.context.canvasHeight/ 5, '70px Guardians');
			}
		},  this.refreshRate);
	},

  drawText: function (text, width, height, font) {
    this.context.save();
    this.context.fillStyle = "#D30035";
    this.context.font = font;
    this.context.textAlign = 'center';
    this.context.fillText(text, width, height);
    this.context.restore();
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
    if (this.stages.length - 1 > this.currentStage) {
      this.currentStage += 1;
    }
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

  switch (key.which) {
    case 32:
      key.preventDefault();
      azureStar.ship.shot();
      break;
    case 13:
      azureStar.gameReady = true;
      break;
    default:
      azureStar.keys[key.which] = key.type == 'keydown';
      break;
  }
};

azureCanvas.onkeyup = function (key) {
  azureStar.keys[key.which] = key.type == 'keydown';
};
