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
    this.ship = new spaceShip();
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
    this.enemies = [];
    this.onReady();
    return this;
  },

  showPoints: function() {
    document.getElementById('scoreCounter').innerText = pad(this.ship.score);
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
          self.ship.startLife();
          self.showPoints();
          self.addEnemy();
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
			self.ship.build(self.context, self.enemies);
      self.enemies.forEach(function (enemy) {
        enemy.build(self.context, self.ship);
      });
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
	},

  addEnemy: function () {
    var self = this;
    setInterval(function () {
      var newEnemy = new enemy('enemies/enemy01.png');
      newEnemy.movement();
      self.enemies.push(newEnemy);
      self.enemies = self.enemies.filter(function (enemy) {
        return enemy.position.height < enemy.maxPosition.height;
      });

    }, Math.random() * 4000 );
  },
}).init();

var azureCanvas = document.getElementById("azureCanvas");

azureCanvas.focus();

azureCanvas.onblur = function () {
  azureCanvas.focus();
};

azureCanvas.onkeydown = function (key) {

  switch (key.which) {
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
