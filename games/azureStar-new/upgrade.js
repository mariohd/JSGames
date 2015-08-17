function Upgrade(){}

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
      
      if ( colisor.desenharQuadrados() ) {
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
		this.position.y += this.velocidade * animacao.decorrido / 1000;
		if (this.position.y > 700) {
		 animacao.excluirSprite(this);
		}
		this.sprite.proximoQuadro();
	},
	colidiuCom: function (outro) {
		if (outro instanceof Player) {
			this.acao(outro);
			outro.pontuar(200);
			animacao.excluirSprite(this);
			colisor.excluirSprite(this);
		}
	}
};