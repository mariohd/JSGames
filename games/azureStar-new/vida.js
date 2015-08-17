function Vida(context, imagem, position) {
	this.context = context;
	this.imagem = imagem;
	this.sprite = new Spritesheet(this.context, this.imagem, 1, 1);
	this.position = position;
	this.escala = 5.8;
	this.sprite.intervalo = 80;	
	this.velocidade = 100;
}

Vida.prototype = Object.create(Upgrade.prototype);

Vida.prototype.tocarSom = function () {
	sons.life.volume = .4;
	sons.life.play();
	sons.life.currentTime = 0.0;

};

Vida.prototype.acao = function (quem) {
	this.tocarSom();
	quem.vidas ++ ;
    updateVidas();
}