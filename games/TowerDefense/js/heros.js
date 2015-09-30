function Archer(context, image, position) {
	this.context = context;
	this.sprite = new Spritesheet(this.context, image, 21, 13, 13);
	this.sprite.linha = Person.prototype.MOVEMENTS.ATTACKS.BOW.RIGHT;
	this.position = {
		x: parseInt(position.x - this.sprite.size.width/2),
		y: parseInt(position.y - this.sprite.size.height/2)
	};
};
Archer.prototype = Object.create(Person.prototype);

function Swordsman() {};
function Pikemen() {};
function Healer() {};
function Mage() {};

