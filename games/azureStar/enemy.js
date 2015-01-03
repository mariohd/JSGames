var movementModes = [
  function (enemy) {
    enemy.y += 3;
  },
  function (enemy) {
    enemy.y += 1.5;
    if (enemy.goToLeft) {
      enemy.x += 3;
      if (enemy.x == enemy.maxPosition.width ) {
        enemy.goToLeft = false;
        enemy.goToRight = true;
      }
    }
    else {
      enemy.x -= 3;
      if (enemy.x == enemy.minPosition.width) {
        enemy.goToLeft = true;
        enemy.goToRight = false;
      }
    }
  },
  function (enemy) {
    enemy.y += 1;
    if (enemy.goToLeft) {
      enemy.x += 3;
      if (enemy.x == enemy.maxPosition.width) {
        enemy.goToLeft = false;
        enemy.goToRight = true;
      }
    }
    else {
      enemy.x -= 3;
      if (enemy.x == enemy.minPosition.width) {
        enemy.goToLeft = true;
        enemy.goToRight = false;
      }
    }
  }
];

var Enemy = extend(Sprite, function(image) {
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  Sprite.call(this, {
    url: image,
    position: {
      x: (this.maxPosition.width - this.minPosition.width)/2,
      y: 10
    },
    scale: 0.2
  });

  this.speed = 5;
  this.scoreValue = 25;
  this.goToLeft = Math.random().toFixed() == 0 ? false : true;
  this.goToRight = !this.goToLeft;
  this.bullets = [];
  this.shot();
  this.movementFunction = movementModes[0];
});


Enemy.prototype.shot = function () {
  var self = this;
  setInterval(function () {
    self.bullets.push(new Bullet({
      x: self.x + self.width/8,
      y: self.y + self.height/5
    }));
  }, 500);
};

Enemy.prototype.build = function (context, target) {
  var self = this;

  this.move();
  this.bullets = this.bullets.filter(function (bullet) {
    return bullet.height >  0;
  });
  this.bullets.forEach(function (bullet) {
    bullet.build(context, +10);
  });
  if (this.y % 100 == 0) {
    this.movementFunction = movementModes[(Math.random() * 2).toFixed()];
  }
  this.bullets.forEach(function (bullet, index) {
    if (target.collide(bullet)) {
      target.reduceLife();
      self.bullets.splice(index, 1);
    }
  });

  this.render(context, 0.2);
};

Enemy.prototype.move = function () {
  this.movementFunction.call(this, this);
};
