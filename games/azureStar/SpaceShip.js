var SpaceShip = extend(Sprite, function(boundaries) {
  Sprite.call(this, {
    url: 'images/ship/ship.png',
    position: {
      x: boundaries().width/2,
      y: boundaries().height - 100
    },
    scale: 0.4
  });
  this.boundaries = boundaries;
  this.speed = 5;
  this.bullets = [];
  this.initiateShooter();
  this.shotControl = true;
  this.lives = 3;
  this.score = 0;
});

SpaceShip.prototype.initiateShooter = function () {
  var self = this;
  setInterval(function () {
    self.shootControl = true;
  }, 150);
};

SpaceShip.prototype.update = function (context, enemies) {
  this.bullets = this.bullets.filter(function(bullet) {
    return bullet.y >  0;
  });
  this.bullets.forEach(function(bullet) {
    bullet.move(-10);
  });
    // enemies.forEach(function (enemy, index) {
    //   self.bullets.forEach(function (bullet, b_index) {
    //     if (enemy.collide(bullet)){
    //       self.score += enemy.scoreValue;
    //       self.updateScore();
    //       enemies.splice(index, 1);
    //       self.bullets.splice(b_index, 1);
    //     }
    //   });
    // });
    //
};
SpaceShip.prototype.render = function(context) {
  this.parent.render.call(this, context);
  this.bullets.forEach(function(bullet){
    bullet.render(context);
  });
};

SpaceShip.prototype.moveLeft = function() {
  if (this.x - this.speed > 0) {
    this.x -= this.speed;
  }
};

SpaceShip.prototype.moveUp = function() {
  if (this.y - this.speed > 0) {
    this.y -= this.speed;
  }
};

SpaceShip.prototype.moveRight = function() {
  if (this.boundaries().width > this.x + this.width + this.speed) {
    this.x += this.speed;
  }
};

SpaceShip.prototype.moveDown = function() {
  if (this.boundaries().height > this.y + this.height + this.speed) {
    this.y += this.speed;
  }
};

SpaceShip.prototype.shoot = function() {
  if(this.shootControl) {
    this.bullets.push(new Bullet({
      x: ( this.x + this.width / 2),
      y: this.y
    }));
    this.shootControl = false;
  }
};
