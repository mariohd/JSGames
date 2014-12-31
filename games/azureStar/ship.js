function spaceShip() {
  this.sprite;
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  this.position = { width : (this.maxPosition.width - this.minPosition.width)/2 , height: (this.maxPosition.height - this.minPosition.height)};
  this.speed = 5;
  this.bullets = [];
  this.init();
  this.initiateShooter();
  this.shotControl = true;
  this.continues = 3;
  this.score = 0;
  this.box;
};

spaceShip.prototype.initiateShooter = function () {
  var self = this;
  var intervalId = setInterval(function () {
    self.shotControl = true;
  }, 150);
};

spaceShip.prototype.init = function () {
  this.sprite = new Image();
  this.sprite.classList.add('spaceship');
  this.sprite.src = 'ship/ship.png';
};

spaceShip.prototype.build = function (context, enemies) {
  this.bullets.forEach(function (bullet) {
    bullet.build(context, -10);
  });
  var self = this;
  enemies.forEach(function (enemy, index) {
    self.bullets.forEach(function (bullet, b_index) {
      if (enemy.box.collide(bullet.width, bullet.height)){
        self.score += enemy.scoreValue;
        self.updateScore();
        enemies.splice(index, 1);
        self.bullets.splice(b_index, 1);
      }
    });
  });
  this.box = new CollisionBox(this.position.width, this.position.height, this.sprite.width/2.5, this.sprite.height/2.5);
  context.drawImage(this.sprite, this.position.width, this.position.height, this.sprite.width/2.5, this.sprite.height/2.5);
};

spaceShip.prototype.reduceLife = function () {
  this.continues--;
  var lifeCounter = document.getElementById('lifeCounter');
  lifeCounter.innerText = 'x ' + this.continues;
};

spaceShip.prototype.updateScore = function () {
  document.getElementById('scoreCounter').innerText = pad(this.score);
};

spaceShip.prototype.shot = function () {
  this.bullets = this.bullets.filter(function (bullet) {
    return bullet.height >  0;
  });
  var bullet = new Bullet(this.position.width + (this.sprite.width/6), this.position.height);
  this.bullets.push(bullet);
};

spaceShip.prototype.action = function (keys) {
  if(keys[37] || keys[65]) { // left
    if (this.minPosition.width < this.position.width - this.speed) {
      this.position.width -= this.speed;
    }
  }

  if(keys[38] || keys[87]) { // up
    if (this.minPosition.height < this.position.height - this.speed) {
      this.position.height -= this.speed;
    }
  }

  if(keys[39] || keys[68]) { // right
    if (this.maxPosition.width > this.position.width + this.speed) {
      this.position.width += this.speed;
    }
  }

  if(keys[40] || keys[83]) { // down
    if (this.maxPosition.height > this.position.height + this.speed) {
      this.position.height += this.speed;
    }
  }

  if(keys[32] && this.shotControl) { //space
    this.shot();
    this.shotControl = false;
  }
};

spaceShip.prototype.startLife = function () {
  var lifeCounter = document.getElementById('lifeCounter');
  lifeCounter.innerText = 'x ' + this.continues;
  var image = document.getElementById('miniSpaceShip');
  image.src = this.sprite.src;
  image.height = this.sprite.height * .20;
  image.width = this.sprite.width * .20;
};

function Bullet(width, height) {
  this.width = width;
  this.height = height;
  this.damage = 5;
  this.sprite = new Image();
  this.sprite.src = 'ship/bullet.png';
};

Bullet.prototype.build = function (context, add) {
  this.box = new CollisionBox(this.width, this.height, this.sprite.width, this.sprite.height);
  this.height += add;
  context.drawImage(this.sprite, this.width, this.height, this.sprite.width, this.sprite.height);
};
