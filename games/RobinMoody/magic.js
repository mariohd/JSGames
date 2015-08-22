function Magic(context, imagem, tamanho, sound, position, tempo) {
	this.context = context;
	this.spritesheet = new Spritesheet(context, imagem, tamanho.linhas, tamanho.colunas);
	this.spritesheet.multiline = true;
	this.spritesheet.intervalo = tempo || 220;
	this.position = position;
	sound.currentTime = 0.0;
	sound.play();
	this.spritesheet.fimDoCiclo = function () {
		this.excluir = true;
	};
}

Magic.prototype = {
	desenhar: function () {
		if (! this.excluir) this.spritesheet.desenhar(this.position.x - this.spritesheet.tamanho.largura/5, this.position.y - this.spritesheet.tamanho.altura/5);
	},

	atualizar: function () {
		this.spritesheet.proximoQuadro();
	},
	retangulosColisao : function () {
		return [];
	}
}