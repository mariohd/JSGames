var azureStar = ({
  boundaries: function() {
    return {
      width: (document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 930) - 30,
      height: (document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 530) - 30
    };
  },
  input: new Input(),
  fps: 60,
  sleep: 1000 / this.fps,

  init: function () {
    function createGameCanvas(game, inputHandler) {
      var canvas = document.getElementById('game-canvas');

      canvas.addEventListener('blur', canvas.focus);
      canvas.addEventListener('keydown', inputHandler.keydown);
      canvas.addEventListener('keyup', inputHandler.keyup);

      window.addEventListener('after-resize', function() {
        var boundaries = game.boundaries();
        canvas.width = boundaries.width;
        canvas.height = boundaries.height;
        game.state.resize(boundaries);
      });
      return canvas;
    }

    var self = this,
        canvas = createGameCanvas(this, this.input),
        context = canvas.getContext("2d");

    this.state = new LoadingState(this);
    this.loop(context);

    window.addEventListener('resize', function(e) {
      setTimeout(function() {
        window.dispatchEvent(new Event('after-resize'))
      }, 500);
    });

    window.dispatchEvent(new Event('after-resize'));
    return this;
  },

  loop: function (context) {
    var self = this,
        interval = setInterval(function() {
          if(self.state.isComplete()) {
            self.state = self.state.nextStage();
          }
          self.state.readInput(self.input);
          self.state.update();

          self.sleep = (1000 / self.fps) - measureTime(function(){
            context.clearRect(0 ,0, context.canvas.width, context.canvas.height);
            self.state.render(context);
          });

          clearInterval(interval);
          self.loop(context);
        }, this.sleep);
  },

  gameOver: function(context) {
      context.save();
      context.fillStyle = "#D30035";
      context.font = '70px Guardians';
      context.textAlign = 'center';
      context.fillText("Game Over", this.boundaries.width / 2 , this.boundaries.height / 2);
      context.restore();
  },
}).init();
