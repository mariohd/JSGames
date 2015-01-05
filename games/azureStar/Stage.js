var Stage = function(imageURL, name, exibitionArea, speed) {
  var self = this;

  this.isReady = false;
  this.currentHeight = 0;
  this.exibitionArea = exibitionArea;
  this.speed = speed;
  this.background = new Image();

  this.background.addEventListener('load', function () {
    self.isReady = true;
    self.currentHeight = self.background.height - self.exibitionArea;
    self.ratio = self.background.height/self.background.width;
    self.width = self.background.width * self.ratio;
  });
  this.background.src = imageURL;

  this.showName = function (context) {
    context.fillStyle = "#D30035";
    context.font = '40px Guardians';
    context.textAlign = 'center';
    context.fillText(name, context.canvas.width / 2, context.canvas.height/ 5);
  };
};
Stage.prototype.update = function() {
  if (this.currentHeight >= this.speed) {
    this.currentHeight -= this.speed;
  }
};

Stage.prototype.render = function(context) {
  if (this.isReady) {
    context.drawImage(
      this.background,
      0,
      -this.currentHeight,
      this.width,
      this.background.height
    );

    if ((this.background.height - this.exibitionArea - this.currentHeight) < 120 ) {
      this.showName(context);
    }
  }
};
