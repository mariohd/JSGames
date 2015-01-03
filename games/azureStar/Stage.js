var Stage = function(imageURL, name, exibitionArea, speed) {
  var self = this;

  this.ratio = 1;
  this.isReady = false;
  this.currentHeight = 0;
  this.exibitionArea = exibitionArea;
  this.speed = speed;
  this.background = new Image();

  this.background.addEventListener('load', function () {
    self.isReady = true;
    self.currentHeight = self.background.height - self.exibitionArea;
    self.ratio = Math.max(self.background.width, self.background.height) /
                 Math.min(self.background.width, self.background.height);
  });
  this.background.src = imageURL;

  this.showName = function (context) {
    context.save();
    context.fillStyle = "#D30035";
    context.font = '40px Guardians';
    context.textAlign = 'center';
    context.fillText(name, context.canvas.width / 2, context.canvas.height/ 5);
    context.restore();
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
      this.background.width * this.ratio,
      this.background.height
    );

    if ((this.background.height - this.exibitionArea - this.currentHeight) < 120 ) {
      this.showName(context);
    }
  }
};
