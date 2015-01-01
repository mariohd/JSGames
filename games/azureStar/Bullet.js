var Bullet = extend(Sprite, function(point) {
  Sprite.call(this, 'images/ship/bullet.png', point);
  this.damage = 5;
});

Bullet.prototype.build = function (context, add) {
  this.y += add;
  this.box = new CollisionBox(this);
  this.render(context);
};
