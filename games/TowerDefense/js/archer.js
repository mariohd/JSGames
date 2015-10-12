'use strict'
function Archer(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 13);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.BOW.RIGHT;
	this.sprite.intervalo = 100;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
	this.arrow = 'assets/images/arrow.png';
	this.load();
	this.sprite.acaoIntermediaria(8, function () {
		let shot = new Arrow(this.context, this, this.arrow, Object.create(this.position));
		this.context.projectiles.push(shot);
		this.context.colider.sprites.push(shot);
	}.bind(this));
};
Archer.prototype = Object.create(Person.prototype);
Archer.prototype.load = function () {
	let arrow = new Image();
	arrow.src = this.arrow;
	this.arrow = arrow;
};

function Swordsman(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 5);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.SWORD.RIGHT;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
	this.sprite.intervalo = 110;
};
Swordsman.prototype = Object.create(Person.prototype);

function Pikemen(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 8);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.SPEAR.RIGHT;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
	this.sprite.intervalo = 150;
};
Pikemen.prototype = Object.create(Person.prototype);

function Healer(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 7);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.MAGIC.RIGHT;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
	this.sprite.intervalo = 300;
};
Healer.prototype = Object.create(Person.prototype);

function Mage(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 7);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.MAGIC.RIGHT;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
	this.sprite.intervalo = 300;
	this.fireball = 'assets/images/fireball.png';
	this.load();
	this.sprite.acaoIntermediaria(6, function () {
		this.context.projectiles.push(new Fireball(this.context, this, this.fireball, Object.create(this.position)));
	}.bind(this));
};
Mage.prototype = Object.create(Person.prototype);
Mage.prototype.load = function () {
	let fireball = new Image();
	fireball.src = this.fireball;
	this.fireball = fireball;
};

function Enemy(context, image, position) {}
