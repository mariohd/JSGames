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
		this.context.projectiles.push(new Arrow(this.context, this, this.arrow, Object.create(this.position)));
	}.bind(this));
};
Archer.prototype = Object.create(Person.prototype);
Archer.prototype.load = function () {
	let arrow = new Image();
	arrow.src = this.arrow;
	this.arrow = arrow;
};

function Swordsman() {};
function Pikemen() {};
function Healer() {};
function Mage() {};

