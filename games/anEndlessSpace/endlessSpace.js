function spaceShip() {
  this.sprite;
  this.position = { width : 60, height: 0};
  this.speed = 10;
  this.init();
};

spaceShip.prototype.init = function () {
  this.sprite = new Image();
  this.sprite.src = 'ship/ship.png';
};

spaceShip.prototype.build = function (context) {
  context.drawImage(this.sprite, this.position.width, this.position.height);
};

function SpaceBackground(imageURL, height, exibitionArea) {
  this.backgroundImage = new Image();
  this.backgroundImage.src = imageURL;
  this.initialHeight = height;
  this.currentHeight = this.initialHeight;
  this.currentWidth = this.initialHeight;
  this.exibitionArea = exibitionArea;
  this.speed = .8;
};

SpaceBackground.prototype.build = function (context) {

  if (this.currentHeight == this.initialHeight) {
    this.currentHeight = this.backgroundImage.height - this.exibitionArea;
  }
  context.drawImage(this.backgroundImage, 0, -this.currentHeight);
  this.currentHeight -= this.speed;
};

var endlessSpace = ({
  background: null,
  canvas: null,
  context: null,

  init: function () {
    this.canvas = document.getElementById('endlessCanvas');
    this.context = this.canvas.getContext("2d");
    this.background = new SpaceBackground('background/space.jpg', 0, this.canvas.height);
    this.refresh();
    return this;
  },

  refresh: function () {
    setInterval(function () {
      endlessSpace.context.clearRect(0 ,0, endlessSpace.canvas.width, endlessSpace.canvas.height );
      endlessSpace.background.build(endlessSpace.context);
    }, 1000/60);
  },

}).init();
