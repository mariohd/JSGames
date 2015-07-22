var MovePatterns = function() {
  this.straightAhead = function(boundaries) {
    this.y += this.speed;
  };

  this.leftToRight = function(boundaries) {
    this.y += Math.floor(this.speed/8);

    if(typeof this.goToLeft == 'undefined') {
      this.goToLeft = Math.random().toFixed() == 0;
    }

    if (this.goToLeft) {
      this.x -= this.speed;
      this.goToLeft = (this.x >= 0);
    }
    else {
      this.x += this.speed;
      this.goToLeft = (this.x + this.width >= boundaries.width);
    }
  };

  this.stairs = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    this.y += Math.floor(this.speed * (1 + Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (1 + Math.cos(this.angle)));
    this.angle += Math.PI / 32;
  };

  this.circle = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    this.y += Math.floor(this.speed * (Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (Math.cos(this.angle)));
    this.angle += (2 * Math.PI) / 360;
  };

  this.bouncingCircle = function(boundaries) {
    if(!this.angle) {
      this.angle = 0;
    }
    if(!this.radius || this.radius === 1) {
      this.radius = 256;
    }

    this.y += Math.floor(this.speed * (Math.sin(this.angle)));
    this.x += Math.floor(this.speed * (Math.cos(this.angle)));
    this.angle += (2 * Math.PI) / this.radius;
  };

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  this.select = function() {
    var patterns = [this.stairs, this.leftToRight, this.straightAhead];
    return patterns[randomInt(0, patterns.length)];
  }

};
