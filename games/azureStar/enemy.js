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

Number.prototype.roundTo = function(num) {
  var resto = this%num;
  if (resto <= (num/2)) {
    return this-resto;
  } else {
    return this+num-resto;
  }
}

function enemy(enemyImage) {
  this.sprite;
  this.init(enemyImage);
  this.maxPosition = { width : 930, height: 530 };
  this.minPosition = { width : 0, height: 0 };
  this.position = { width :  (this.maxPosition.width - this.minPosition.width)/2 , height: 0 - this.sprite.height};
  this.speed = 5;
  this.scoreValue = 3;
  this.goToLeft = Math.random().toFixed() == 0 ? false : true;
  this.goToRight = !this.goToLeft;
  this.movementFunction;
};

enemy.prototype.init = function(enemy) {
  this.sprite = new Image();
  this.sprite.classList.add('enemy');
  this.sprite.src = enemy;
  this.movementFunction = movementModes[(Math.random() * 2).toFixed()];
};

enemy.prototype.build = function (context) {
  this.movement();
  if (this.position.height % 100 == 0) {
    this.movementFunction = movementModes[(Math.random() * 2).toFixed()];
  }
  context.drawImage(this.sprite, this.position.width, this.position.height, this.sprite.width/4, this.sprite.height/4);
};

enemy.prototype.movement = function () {
  this.movementFunction.call(this, this);
};
