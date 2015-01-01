var Sprite = function(url, position, onload) {
  var self = this;

  this.x = position.x;
  this.y = position.y;

  this.img = new Image();
  this.img.addEventListener('load', function() {
      self.width = this.width;
      self.height = this.height;
  });

  if(onload) {
    this.img.addEventListener('load', onload);
  }

  this.img.src = url;
};

Sprite.prototype.render = function(context, scale) {
  scale = scale || 1;
  context.drawImage(this.img, this.x, this.y, this.width * scale, this.height * scale);
};
