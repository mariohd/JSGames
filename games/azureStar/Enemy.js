var Enemy = extend(Sprite, function(boundaries, spec) {
  Sprite.call(this, {
    url: spec.image,
    position: spec.position || { x: boundaries.width / 2, y: 10 },
    scale: 0.2
  });
  this.isHit = false;
  this.boundaries = boundaries;
  this.speed = spec.speed || 5;
  this.scoreValue = spec.score || 25;
  this.movePattern = spec.movePattern || function() {};
  this.bullets = [];
  this.startShooting();
});

Enemy.prototype.startShooting = function () {
  var self = this;
  setInterval(function () {
    self.bullets.push(new Bullet({
      x: self.x + (self.width / 8),
      y: self.y + (self.height / 5)
    }));
  }, 500);
};

Enemy.prototype.update = function(target) {
  var self = this;
  this.bullets.forEach(function (bullet) {
    if (target.collide(bullet)) {
      target.hit();
      bullet.hit(true);
    }
    bullet.move(10);
  });
  this.bullets = this.bullets.filter(function (bullet) {
    return (bullet.y < self.boundaries.height) && !bullet.hit();
  });
  this.move();
};

Enemy.prototype.render = function(context) {
  this.parent.render.call(this, context);
  this.bullets.forEach(function(bullet){
    bullet.render(context);
  });
}

Enemy.prototype.move = function () {
  this.movePattern.call(this, this.boundaries);
};

Enemy.prototype.hit = function(didHit) {
  if(typeof didHit !== 'undefined') {
    this.isHit = didHit;
  }
  return this.isHit;
};
