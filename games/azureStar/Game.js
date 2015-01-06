var azureStar = ({
  boundaries: function() {
    return {
      width: (document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 930) - 30,
      height: (document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 530) - 30
    };
  },
  input: new Input(),

  init: function () {
    function createGameCanvas(game, inputHandler) {
      var canvas = document.getElementById('game-canvas');

      canvas.addEventListener('blur', canvas.focus);
      canvas.addEventListener('keydown', inputHandler.keydown);
      canvas.addEventListener('keyup', inputHandler.keyup);
      canvas.focus();

      window.addEventListener('after-resize', function() {
        var boundaries = game.boundaries();
        canvas.width = boundaries.width;
        canvas.height = boundaries.height;
        game.state.resize(boundaries);
      });
      return canvas;
    }

    var self = this,
        canvas = createGameCanvas(this, this.input);

    this.context = canvas.getContext("2d");
    this.state = new LoadingState(this);
    this.loop();

    window.addEventListener('resize', function(e) {
      setTimeout(function() {
        window.dispatchEvent(new Event('after-resize'))
      }, 500);
    });

    window.dispatchEvent(new Event('after-resize'));
    return this;
  },

  loop: function() {
    var self = this;

    (function gameLoop() {
      if(self.state.isComplete()) {
        self.state = self.state.nextStage();
      }
      self.state.readInput(self.input);
      self.state.update();

      self.context.clearRect(0 ,0, self.context.canvas.width, self.context.canvas.height);
      self.state.render(self.context);
      requestAnimationFrame(gameLoop);
    })();
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
