function StageOne(imageURL, height, exibitionArea) {
  this.backgroundImage = new Image();
  this.initialHeight = height;
  this.currentHeight = this.initialHeight;
  this.currentWidth = this.initialHeight;
  this.exibitionArea = exibitionArea;
  this.speed = .6;
  this.isReady = false;
  var self = this;
  this.backgroundImage.onload = function () {
	self.isReady = true;
	self.currentHeight = self.backgroundImage.height - self.exibitionArea
  };
  this.backgroundImage.src = imageURL;
};

StageOne.prototype.build = function (context) {
	if (this.isReady) {
		context.drawImage(this.backgroundImage, 0, -this.currentHeight, this.backgroundImage.width, this.backgroundImage.height);
		if (this.currentHeight >= this.speed) {
			this.currentHeight -= this.speed;
		}
	}
};

						
function StageTwo(imageURL, height, exibitionArea) {
  this.backgroundImage = new Image();
  this.initialHeight = height;
  this.currentHeight = this.initialHeight;
  this.currentWidth = this.initialHeight;
  this.exibitionArea = exibitionArea;
  this.speed = .8;
  this.isReady = false;
  var self = this;
  this.backgroundImage.onload = function () {
	self.isReady = true;
	self.currentHeight = self.backgroundImage.height - self.exibitionArea
  };
  this.backgroundImage.src = imageURL;
};

StageTwo.prototype.build = function (context) {
	if (this.isReady) {
		context.drawImage(this.backgroundImage, 0, -this.currentHeight, this.backgroundImage.width/2, this.backgroundImage.height);
		if (this.currentHeight >= this.speed) {
			this.currentHeight -= this.speed;
		}
	}
};