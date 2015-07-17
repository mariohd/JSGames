function Escudo(context, imagem, position) {
	this.context = context;
	this.imagem = imagem;
	this.sprite = new Spritesheet(this.context, this.imagem, 1, 89);
	this.position = position;
	this.escala = 1.7;
	this.sprite.intervalo = 20;	
	this.velocidade = 100;
}

Escudo.prototype = Object.create(Upgrade.prototype);

Escudo.prototype.tocarSom = function () {
	sons.escudo.volume = .4;
	sons.escudo.play();
	sons.escudo.currentTime = 0.0;
};

Escudo.prototype.acao = function () {
	if (!player1.escudo) {
		this.tocarSom(); 
		player1.acionarEscudo();
	}
}