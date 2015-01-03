var Stage01 = extend(Stage, function(game) {

  var self = this,
      ship = new SpaceShip(game.boundaries);

  Stage.call(this, 'images/stages/witchBroomNebula.jpg',
                   'Witch Broom Nebula',
                   game.boundaries().height,
                   0.6);

  window.stage = this;

  this.update = function() {
    self.parent.update.call(this);
    ship.update();
  };

  this.render = function(context) {
    self.parent.render.call(this, context);
    ship.render(context);
  };

  this.readInput = function(input) {
    if(input.pressed('left_arrow')) {
      ship.moveLeft();
    }
    if(input.pressed('right_arrow')) {
      ship.moveRight();
    }
    if(input.pressed('up_arrow')) {
      ship.moveUp();
    }
    if(input.pressed('down_arrow')) {
      ship.moveDown();
    }
    if(input.pressed('space')){
      ship.shoot();
    }
  };

  this.addEnemy = function () {
    var self = this;
    setInterval(function () {
      self.enemies.push(new Enemy('images/enemies/enemy01.png'));
      self.enemies = self.enemies.filter(function (enemy) {
        return enemy.y < enemy.maxPosition.height;
      });
    }, 1000);
  };
  this.isComplete = function() {
    return false;
  };
});
