var Bullet = extend(Sprite, function(point) {
  Sprite.call(this, {
    url: 'images/ship/bullet.png',
    position: point 
  });
  this.damage = 5;
});

Bullet.prototype.move = function(step) {
  this.y += step;
}
