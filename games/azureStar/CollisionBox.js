function CollisionBox(widthPosition, heightPosition, widthSize, heightSize) {
  this.width = widthPosition;
  this.height = heightPosition;
  this.size = {width: widthSize, height: heightSize};
};

CollisionBox.prototype.collide = function (width, height) {

  if ((this.width <= width &&
       this.width + this.size.width >= width)
       &&
      (this.height <= height &&
       this.height + this.size.height >= height)) {
    return true;
  } else {
    return false;
  }
};

CollisionBox.prototype.draw = function (context) {
  context.beginPath();
  context.rect(this.width, this.height, this.size.width, this.size.height);
  context.stroke();
};
