var LoadingState = function(game) {
  var self = this,
      loadingImage = new Image(),
      isComplete = false;

  loadingImage.addEventListener('load', function() {
    loadingImage.ready = true;
  });
  loadingImage.src = 'images/stages/loading.jpg';

  function drawText(context, text, x, y, font) {
    context.save();
    context.fillStyle = "#D30035";
    context.font = font;
    context.textAlign = 'center';
    context.fillText(text, x, y);
    context.restore();
  };

  this.render = function(context) {
    if(loadingImage.ready) {
      context.drawImage(loadingImage, 0, 0, context.canvas.width, context.canvas.height);
    }

    drawText(context, 'Azure Star', context.canvas.width / 2, context.canvas.height / 5, '70px Guardians');
    drawText(context, 'Press Enter to begin', context.canvas.width / 2, context.canvas.height / 1.1, '23px Guardians');
  };

  this.readInput = function(input) {
    if(input.pressed('enter')) {
      isComplete = true;
    }
    if(input.pressed('up_arrow')) {
      console.log('up arrow');
    }
    if(input.pressed('down_arrow')) {
      console.log('down arrow');
    }
    if(input.pressed('left_arrow')) {
      console.log('left arrow');
    }
    if(input.pressed('right_arrow')) {
      console.log('right arrow');
    }
  };

  this.update = function() {

  };

  this.isComplete = function() {
    return isComplete;
  };

  this.nextStage = function () {
    return new Stage01(game);
  };

  this.resize = function() {};
};
