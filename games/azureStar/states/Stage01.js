var Stage01 = extend(Stage, function(game) {

  var self = this,
      enemies = [],
      enemyInterval = null,
      boundaries = game.boundaries(),
      ship = new SpaceShip(boundaries),
      movePatterns = new MovePatterns();

  Stage.call(
    this,
    'images/stages/witchBroomNebula.jpg',
    'Witch Broom Nebula',
    boundaries.height,
    0.6
  );

  function deployEnemies(enemyFactory) {
    return function(amount) {
      var handler = setInterval(function() {
        if(amount == 0) {
          clearInterval(handler);
        }
        enemies.push(enemyFactory());
        amount--;
      }, 300)
    };
  }
  // window.setTimeout(function(){
  //   enemyInterval = setInterval(function () {
  //       enemies.push(new Enemy(boundaries, {
  //         image: 'images/enemies/enemy01.png',
  //         speed: 3,
  //         movePattern: movePatterns.select()
  //       }));
  //     }, 500);
  // }, 2000);

  this.stairsWave = deployEnemies(function() {
    return new Enemy(boundaries, {
            image: 'images/enemies/enemy01.png',
            speed: 4,
            movePattern: movePatterns.stairs
           });
    });

  this.circleWave = deployEnemies(function() {
    return new Enemy(boundaries, {
             image: 'images/enemies/enemy01.png',
             speed: 5,
             movePattern: movePatterns.circle
           });
    });
  this.bouncingCircleWave = deployEnemies(function(){
    return new Enemy(boundaries, {
      image: 'images/enemies/enemy01.png',
      speed: 5,
      movePattern: movePatterns.bouncingCircle,
      position: {
        x: boundaries.width,
        y: 30
      }
    });
  });

  window.stage = this;
  window.setTimeout(self.stairsWave, 10000, 20);
  window.setTimeout(self.circleWave, 1000, 20);
  window.setTimeout(self.stairsWave, 50000, 20);

  this.update = function() {
    this.parent.update.call(this);
    enemies =
      enemies.map(function(enemy){
        enemy.update(ship);
        return enemy;
      })
      .filter(function(enemy) {
        return enemy.y < boundaries.height && !enemy.isHit;
      });

    ship.update(enemies);
  };

  this.render = function(context) {
    this.parent.render.call(this, context);
    ship.render(context);
    enemies.forEach(function(enemy) {
      enemy.render(context);
    });
  };

  this.readInput = function(input) {
    if(input.pressed('left_arrow', 'a')) {
      ship.moveLeft();
    }
    if(input.pressed('right_arrow', 'd')) {
      ship.moveRight();
    }
    if(input.pressed('up_arrow', 'w')) {
      ship.moveUp();
    }
    if(input.pressed('down_arrow', 's')) {
      ship.moveDown();
    }
    if(input.pressed('space')){
      ship.shoot();
    }
  };

  this.isComplete = function() {
    return false;
  };

  this.resize = function(newBoundaries) {
    boundaries = newBoundaries;
    ship.boundaries = newBoundaries;
    enemies.forEach(function(enemy){
      enemy.boundaries = newBoundaries;
    });
  };

});
