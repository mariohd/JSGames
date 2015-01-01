function Wall(width, height) {
	this.width = width;
	this.height = height;
	this.img = new Image();
	this.img.src = 'maze/wall.png';
};

Wall.prototype.build = function(context) {
	context.drawImage(this.img, this.width, this.height);
};