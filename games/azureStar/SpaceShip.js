var SpaceShip = extend(Sprite, function() {
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  Sprite.call(this, 'images/ship/ship.png', {
    x: (this.maxPosition.width - this.minPosition.width)/2,
    y: (this.maxPosition.height - this.minPosition.height)
  });
  this.speed = 5;
  this.bullets = [];
  this.initiateShooter();
  this.shotControl = true;
  this.continues = 3;
  this.score = 0;
  this.over = false;
  this.box;
});

SpaceShip.prototype.initiateShooter = function () {
  var self = this;
  setInterval(function () {
    self.shotControl = true;
  }, 150);
};

SpaceShip.prototype.build = function (context, enemies) {
  if (!this.over) {
    this.bullets.forEach(function (bullet) {
      bullet.build(context, -10);
    });
    var self = this;
    enemies.forEach(function (enemy, index) {
      self.bullets.forEach(function (bullet, b_index) {
        if (enemy.box.collide(bullet)){
          self.score += enemy.scoreValue;
          self.updateScore();
          enemies.splice(index, 1);
          self.bullets.splice(b_index, 1);
        }
      });
    });
    this.box = new CollisionBox({
      x: this.x,
      y: this.y,
      width: this.width/2.5,
      height: this.height/2.5
    });

    this.render(context, 0.4);
  }
  else {
    context.save();
    context.fillStyle = "#D30035";
    context.font = '70px Guardians';
    context.textAlign = 'center';
    context.fillText("Game Over", (this.maxPosition.width - this.minPosition.width)/2 ,(this.maxPosition.height - this.minPosition.height)/2);
    context.restore();
  }
};

SpaceShip.prototype.reduceLife = function () {
  if (this.continues > 0) {
    this.continues--;
    this.updateLifes();
  } else {
    this.gameOver();
  }
};


SpaceShip.prototype.updateLifes = function () {
  var lifeCounter = document.getElementById('lifeCounter');
  lifeCounter.innerText = 'x ' + this.continues;
};

SpaceShip.prototype.gameOver = function () {
  this.over = true;
};

SpaceShip.prototype.updateScore = function () {
  if (this.score % 500 == 0) {
    this.continues ++;
    this.updateLifes();
  }
  document.getElementById('scoreCounter').innerText = pad(this.score);
};

SpaceShip.prototype.shot = function () {
  this.bullets = this.bullets.filter(function (bullet) {
    return bullet.height >  0;
  });
  this.bullets.push(new Bullet({
    x: this.x + (this.width/6),
    y: this.y
  }));
};

SpaceShip.prototype.action = function (keys) {
  if(keys[37] || keys[65]) { // left
    if (this.minPosition.width < this.x - this.speed) {
      this.x -= this.speed;
    }
  }

  if(keys[38] || keys[87]) { // up
    if (this.minPosition.height < this.y - this.speed) {
      this.y -= this.speed;
    }
  }

  if(keys[39] || keys[68]) { // right
    if (this.maxPosition.width > this.x + this.speed) {
      this.x += this.speed;
    }
  }

  if(keys[40] || keys[83]) { // down
    if (this.maxPosition.height > this.y + this.speed) {
      this.y += this.speed;
    }
  }

  if(keys[32] && this.shotControl) { //space
    this.shot();
    this.shotControl = false;
  }
};

SpaceShip.prototype.startLife = function () {
  // var lifeCounter = document.getElementById('lifeCounter');
  // lifeCounter.innerText = 'x ' + this.continues;
  // var image = document.getElementById('miniSpaceShip');
  // image.src = this.sprite.src;
  // image.height = this.sprite.height * .20;
  // image.width = this.sprite.width * .20;
};
