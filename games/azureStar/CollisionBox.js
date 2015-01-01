var CollisionBox = function(box) {
  this.x = box.x;
  this.y = box.y;
  this.width = box.width;
  this.height = box.height;
};

CollisionBox.prototype.collide = function(box) {
  return   (this.x <= box.x && this.x + this.width >= box.width)
        && (this.y <= box.y && this.y + this.height >= box.height);
};

CollisionBox.prototype.draw = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.stroke();
};
