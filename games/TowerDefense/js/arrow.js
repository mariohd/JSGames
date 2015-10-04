function Arrow(context, archer, image, position) {
	this.context = context;
	this.archer = archer;
	this.sprite = new Spritesheet(this.context, image, 1, 1, 1);
	this.position = {
		x: parseInt(position.x + archer.sprite.size.width/2),
		y: parseInt(position.y + archer.sprite.size.height/2.1)
	};
}

Arrow.prototype = Object.create(Projectile.prototype);
