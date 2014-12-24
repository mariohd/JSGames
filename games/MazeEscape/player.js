var Direction = { 'LEFT': 0, 'RIGHT' : 1, 'FRONT': 2, 'BACK': 3};

function Player()  {
	this.spritesLEFT =  [this.getImage('player/left_000.png'), this.getImage('player/left_001.png'), this.getImage('player/left_000.png'), this.getImage('player/left_003.png')];
	this.spritesRIGHT = [this.getImage('player/right_000.png'), this.getImage('player/right_001.png'), this.getImage('player/right_000.png'), this.getImage('player/right_003.png')];
	this.spritesFRONT = [this.getImage('player/front_000.png'), this.getImage('player/front_001.png'), this.getImage('player/front_000.png'), this.getImage('player/front_003.png')];
	this.spritesBACK =  [this.getImage('player/back_000.png'), this.getImage('player/back_001.png'), this.getImage('player/back_000.png'), this.getImage('player/back_003.png')];
	this.currentSprite = 0;
	this.img = null;
	this.direction = Direction.FRONT;
	this.position = {width : 60, height: 0};
	this.walking = false;
	this.speed = 7;
};

Player.prototype.getImage = function (url) {
	var img = new Image();
	img.src = url;
	return img;
};

Player.prototype.draw = function(context, canvas) {
	switch (this.direction) {
		case Direction.LEFT:
			this.img = this.spritesLEFT[this.currentSprite];
			context.drawImage(this.img, this.position.width, this.position.height);
			break;

		case Direction.FRONT:
			this.img = this.spritesFRONT[this.currentSprite];
			context.drawImage(this.img, this.position.width, this.position.height);
			break;

		case Direction.BACK:
			this.img = this.spritesBACK[this.currentSprite];
			context.drawImage(this.img, this.position.width, this.position.height);
			break;

		case Direction.RIGHT:
			this.img = this.spritesRIGHT[this.currentSprite];
			context.drawImage(this.img, this.position.width, this.position.height);
			break;
	}
}

Player.prototype.walk = function () {
	switch (this.direction) {
		case Direction.LEFT:
			this.position.width -= this.speed;
			break;

		case Direction.FRONT:
			this.position.height += this.speed;
			break;

		case Direction.BACK:
			this.position.height -= this.speed;
			break;

		case Direction.RIGHT:
			this.position.width += this.speed;
			break;
		}
};


Player.prototype.walkSprites = function () {
	var me = this;
	setInterval(function () {
		me.currentSprite += 1;
		if (me.currentSprite == 4){
			me.currentSprite = 0;
		}
		if (! me.walking) {
			me.currentSprite = 0;
		}
	}, 200);
};