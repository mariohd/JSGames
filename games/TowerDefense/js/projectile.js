function Projectile() {}

Projectile.prototype = {
	speed : 4,
	erase : false,
	draw: function () {
		this.move();
		this.sprite.proximoQuadro();
		this.sprite.desenhar(this.position);
	},

	move: function () {
		this.position.x += this.speed;
		if( this.position.x - (3 * this.sprite.size.width)  > this.context.canvas.width ) {
			this.erase = true;
		}
	}
};

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


function Fireball(context, mage, image, position) {
	this.context = context;
	this.mage = mage;
	this.sprite = new Spritesheet(this.context, image, 1, 5, 5);
	this.sprite.intervalo = 100;
	this.position = {
		x: parseInt(position.x + mage.sprite.size.width/2),
		y: parseInt(position.y + mage.sprite.size.height/2)
	};
}

Fireball.prototype = Object.create(Projectile.prototype);
