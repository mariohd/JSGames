function Stage(imageURL, height, exibitionArea, speed) {
  this.backgroundImage = new Image();
  this.initialHeight = height;
  this.currentHeight = this.initialHeight;
  this.currentWidth = this.initialHeight;
  this.exibitionArea = exibitionArea;
  this.speed = speed;
  this.isReady = false;
  var self = this;
  this.backgroundImage.onload = function () {
	   self.isReady = true;
	   self.currentHeight = self.backgroundImage.height - self.exibitionArea
  };
  this.backgroundImage.src = imageURL;
};

Stage.prototype.build = function (context) {
	if (this.isReady) {
		context.drawImage(this.backgroundImage, 0, -this.currentHeight, this.backgroundImage.width, this.backgroundImage.height);
		if (this.currentHeight >= this.speed) {
			this.currentHeight -= this.speed;
		}
	}
};
