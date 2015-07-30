function Cannons(context, imagem, position){
	this.context = context;
	this.position = position;
	this.velocidade = 100;
	this.imagem = imagem;
	this.sprite = new Spritesheet(this.context, this.imagem, 1, 48);
	this.sprite.intervalo = 80;
	this.escala = 3.5;
}

Cannons.prototype = Object.create(Upgrade.prototype);

Cannons.prototype.tocarSom = function () {
	sons.upgrade.volume = .5;
	sons.upgrade.play();
	sons.upgrade.currentTime = 0.0;
};

Cannons.prototype.acao = function (quem) {
	if (! quem.upgraded) {
		this.tocarSom();
  		quem.upgrade();
  	}
};