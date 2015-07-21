function Chefe() {};

Chefe.prototype = {
	desenhar: function () {
		this.sprite.desenhar(this.position, this.escala);
		this.sprite.proximoQuadro();
	},

	limitesDeX: function (x) {
		return this.minPosition.x < x && x < this.maxPosition.x; 
	},

	limitesDeY: function (y) {
		return this.minPosition.y < y && y < this.maxPosition.y; 
	},

  	colidiuCom: function (outro) {
  		if (outro instanceof Player) {
  			outro.destruir();
  		}
  	},

  	destruir: function () {
  		animacao.excluirSprite(this);
        colisor.excluirSprite(this);

        var exp1 = new Explosao(this.context, imagens.explosao,
                                 this.position.x + 50, this.position.y + 50, 1);

        var exp2 = new Explosao(this.context, imagens.explosao,
                                 this.position.x + 150, this.position.y, 1);

        var exp3 = new Explosao(this.context, imagens.explosao,
                                 this.position.x, this.position.y + 100, 1);

        animacao.novoSprite(exp1);
        animacao.novoSprite(exp2);
        animacao.novoSprite(exp3);

        exp3.fimDaExplosao = function () {
        	pontuacao += 1000;
			updatePontuacao();
  			currentStage.proximaFase();
        }; 
  	},

  	damage: function () {
  		this.life--;
  		sons.boss_hit.currentTime = 0.0;
   		sons.boss_hit.volume = 0.08;
  		sons.boss_hit.play();
  		if (this.life <= 0 ){
  			this.destruir();
  		}
  	}
};