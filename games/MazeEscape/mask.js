var maskCanvas = ({
  mask: null,
  position: {width : 60, height: 0},
  context: null,
  radius: 160,

  init: function () {
    this.mask = document.getElementById("mask");
    this.context = this.mask.getContext("2d");
    this.drawCircle();
    return this;
  },

  drawCircle: function () {
    this.context.save();
    this.blackBox();
    this.context.globalCompositeOperation = "destination-out";

    this.context.moveTo(this.position.width, this.position.height);
    this.context.arc(this.position.width, this.position.height, this.radius, 0, Math.PI*2);

    this.context.fill();
    this.context.restore();

  },

  blackBox: function () {
    this.context.clearRect(0 ,0, this.mask.width, this.mask.height );

    this.context.fillStyle = "rgba(0,0,0,.95)";
    this.context.fillRect(0, 0, this.mask.width, this.mask.height);
  },

  move: function (position) {
    this.position = position;
    this.drawCircle();
  },

  refresh: function () {
    setInterval(function () {
      maskCanvas.drawCircle();
    }, 15);
  }

}).init();
