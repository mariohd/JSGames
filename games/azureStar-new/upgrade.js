function Upgrade(context, imagem, position){
	this.context = context;
	this.position = position;
	this.velocidade = 100;
	this.imagem = imagem;
	this.sprite = new Spritesheet(this.context, this.imagem, 1, 48);
	this.sprite.intervalo = 80;
	this.escala = 3.5;
}

Upgrade.prototype = {
	desenhar: function () {
		this.sprite.desenhar(this.position, this.escala);
	},

	retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
        {x: this.position.x, y: this.position.y, largura: (this.imagem.width/this.sprite.numColunas)/this.escala, altura: this.imagem.height/this.escala }
      ];
      
      // Desenhando os retângulos para visualização
      
      if ( this.colisor.desenharQuadrados() ) {
	      var ctx = this.context;
	      
	      for (var i in rets) {
	         ctx.save();
	         ctx.strokeStyle = 'yellow';
	         ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
	                        rets[i].altura);
	         ctx.restore();
	      }
      }
      
      return rets;
  	},

	atualizar: function () {
		this.position.y += this.velocidade * this.animacao.decorrido / 1000;
		if (this.position.y > 700) {
		 this.animacao.excluirSprite(this);
		}
		this.sprite.proximoQuadro();
	},
	colidiuCom: function (outro) {
		if (outro instanceof Player) {
			outro.pontuar(200);
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	}
};