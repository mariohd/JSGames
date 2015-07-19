var Bullet = extend(Sprite, function(point) {
  var didHit = false;

  Sprite.call(this, {
    url: 'images/ship/bullet.png',
    position: point
  });

  this.damage = 5;

  this.hit = function(hit) {
    if(typeof hit !== 'undefined') {
      didHit = hit;
    }
    return didHit;
  };
});

Bullet.prototype.move = function(step) {
  this.y += step;
}
