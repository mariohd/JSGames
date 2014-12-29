function Stage(imageURL, name,exibitionArea, speed) {
  this.backgroundImage = new Image();
  this.currentHeight;
  this.exibitionArea = exibitionArea;
  this.speed = speed;
  this.isReady = false;
  this.name = name;
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
    if ( (this.backgroundImage.height - this.exibitionArea) - this.currentHeight < 120 ) {
      this.showName(context);
    }
	}
};

Stage.prototype.showName = function (context) {
  context.save();
  context.fillStyle = "#D30035";
  context.font = '40px Guardians';
  context.textAlign = 'center';
  context.fillText(this.name, context.canvasWidth/ 2, context.canvasHeight/ 5);
  context.restore();
};
