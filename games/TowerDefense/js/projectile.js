function Projectile() {}

Projectile.prototype = {
	speed : 4,
	erase : false,
	draw: function () {
		this.move();
		this.sprite.desenhar(this.position);
	},

	move: function () {
		this.position.x += this.speed;
		if( 0 > this.position.x + this.sprite.imagem.width || this.position.x > this.context.canvas.width ) {
			this.erase = true;
		}
	}
};