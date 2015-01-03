var Sprite = function(spec) {
  var self = this;

  this.x = spec.position.x;
  this.y = spec.position.y;
  this.scale = spec.scale || 1;
  this.img = new Image();
  this.img.addEventListener('load', function() {
      self.width = this.width * self.scale;
      self.height = this.height * self.scale;
  });

  if(spec.onload) {
    this.img.addEventListener('load', onload);
  }

  this.img.src = spec.url;
};

Sprite.prototype.render = function(context) {
  context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Sprite.prototype.collide = function(sprite) {
  return   (this.x <= sprite.x && this.x + this.width >= sprite.width)
        && (this.y <= sprite.y && this.y + this.height >= sprite.height);
};

Sprite.prototype.drawCollisionBox = function(context) {
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.stroke();
};
