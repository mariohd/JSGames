var movementModes = [
function (enemy) {
  enemy.position.height += 3;
},
function (enemy) {
  enemy.position.height += 1.5;
  if (enemy.goToLeft) {
    enemy.position.width += 3;
    if (enemy.position.width == enemy.maxPosition.width ) {
      enemy.goToLeft = false;
      enemy.goToRight = true;
    }
  } else {
    enemy.position.width -= 3;
    if (enemy.position.width == enemy.minPosition.width) {
      enemy.goToLeft = true;
      enemy.goToRight = false;
    }
  }
},
function (enemy) {
  enemy.position.height += 1;
  if (enemy.goToLeft) {
    enemy.position.width += 3;
    if (enemy.position.width == enemy.maxPosition.width) {
      enemy.goToLeft = false;
      enemy.goToRight = true;
    }
  } else {
    enemy.position.width -= 3;
    if (enemy.position.width == enemy.minPosition.width) {
      enemy.goToLeft = true;
      enemy.goToRight = false;
    }
  }
}
];

function enemy(enemyImage) {
  this.sprite;
  this.init(enemyImage);
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  this.position = { width :  (this.maxPosition.width - this.minPosition.width)/2 , height: 0 - this.sprite.height};
  this.speed = 5;
  this.scoreValue = 10;
  this.goToLeft = Math.random().toFixed() == 0 ? false : true;
  this.goToRight = !this.goToLeft;
  this.movementFunction;
  this.bullets = [];
  this.shot();
  this.box = new CollisionBox(this.position.width, this.position.height, this.sprite.width/4, this.sprite.height/4);
};

enemy.prototype.init = function(enemy) {
  this.sprite = new Image();
  this.sprite.classList.add('enemy');
  this.sprite.src = enemy;
  this.movementFunction = movementModes[(Math.random() * 2).toFixed()];
};

enemy.prototype.shot = function () {
  var self = this;
  setInterval(function () {
    self.bullets.push(new Bullet(self.position.width + self.sprite.width/8, self.position.height + self.sprite.height/5));
  }, 500);
};

enemy.prototype.build = function (context, target) {
  this.movement();
  this.bullets = this.bullets.filter(function (bullet) {
    return bullet.height >  0;
  });
  this.bullets.forEach(function (bullet) {
    bullet.build(context, +10);
  });
  if (this.position.height % 100 == 0) {
    this.movementFunction = movementModes[(Math.random() * 2).toFixed()];
  }
  var self = this;
  this.bullets.forEach(function (bullet, index) {
    if (target.box.collide(bullet.width, bullet.height)) {
      target.reduceLife();
      self.bullets.splice(index, 1);
    }
  });
  this.box = new CollisionBox(this.position.width, this.position.height, this.sprite.width/4, this.sprite.height/4);
  context.drawImage(this.sprite, this.position.width, this.position.height, this.sprite.width/4, this.sprite.height/4);
};

enemy.prototype.movement = function () {
  this.movementFunction.call(this, this);
};
