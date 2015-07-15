function Player(context, teclado, imagem) {
	this.context = context;
	this.imagem = imagem;
	this.sprite = new Spritesheet(context, this.imagem, 1, 3);
	this.sprite.intervalo = 90;
	this.maxPosition = { x : 925, y: 530 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = { x : this.maxPosition.x/2 , y: this.maxPosition.y };
	this.teclado = teclado;
	this.velocidade = 5;
	this.escala = 2.5;
	this.upgraded = false;
	this.morto = false;
	this.vidas = 0;
};

Player.prototype = {
	atualizar: function () {
		if (this.teclado.pressionada(SETA_ACIMA) || this.teclado.pressionada(W)) {
			if (this.limitesDeX(this.position.y - this.velocidade)) this.position.y -= this.velocidade;
		}
		if (this.teclado.pressionada(SETA_ABAIXO) || this.teclado.pressionada(S)) {
			if (this.limitesDeY(this.position.y + this.velocidade)) this.position.y += this.velocidade;
		}
		if (this.teclado.pressionada(SETA_DIREITA) || this.teclado.pressionada(D)) {
			if (this.limitesDeX(this.position.x + this.velocidade)) this.position.x += this.velocidade;
		}
		if (this.teclado.pressionada(SETA_ESQUERDA) || this.teclado.pressionada(A)) {
			if (this.limitesDeX(this.position.x - this.velocidade)) this.position.x -= this.velocidade;
		}
	},
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

	atirar: function () {
		if (! this.morto ) {
			var t = new Tiro(this.context, this);
			animacao.novoSprite(t);
			this.colisor.novoSprite(t);
			if (this.upgraded) {
				var lateralD = new Tiro(this.context, this, this.position.x, this.position.y + this.imagem.height/this.escala/2 - t.imagem.height/t.escala/2 - 15);
				var lateralE = new Tiro(this.context, this, this.position.x + this.largura() - 11, this.position.y + this.imagem.height/this.escala/2 - t.imagem.height/t.escala/2 - 15);
				animacao.novoSprite(lateralD);
				this.colisor.novoSprite(lateralD);
				animacao.novoSprite(lateralE);
				this.colisor.novoSprite(lateralE);
			}
		}
	},

	largura: function () {
		return (this.imagem.width/this.sprite.numColunas)/this.escala;
	},

	upgrade: function () {
		if (!this.upgraded) {
			this.upgraded = !this.upgraded;
			sons.upgrade.volume = .5;
			sons.upgrade.play();
		}
	},
	retangulosColisao: function() {
      var rets = 
      [ 
         {x: this.position.x+16, y: this.position.y, largura: 45, altura: 80},
         {x: this.position.x, y: this.position.y+40, largura: 15, altura: 35},
         {x: this.position.x+62, y: this.position.y+40, largura: 15, altura: 35}

      ];
      
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

  	colidiuCom: function(outro) {
      if (outro instanceof Enemy) {
      	 this.destruir();
         outro.destruir();

      }
      if (outro instanceof Upgrade) {
      	this.upgrade();
      }
   },

	destruir: function () {
		this.morto = true;
        animacao.excluirSprite(this);
        this.colisor.excluirSprite(this);
		var exp1 = new Explosao(this.context, imagens.explosao,
                                 this.position.x, this.position.y);
        animacao.novoSprite(exp1);
        exp1.fimDaExplosao = function() {
			player1.morto = true;
		    if (player1.vidas) {
				player1.position = { x : player1.maxPosition.x/2 , y: player1.maxPosition.y };
				player1.vidas--;
				player1.upgraded = false;
				player1.morto = false;
				animacao.novoSprite(player1);
				colisor.novoSprite(player1);
		    } else {
	            animacao.desligar();
	            context.save()
            	context.textAlign = 'center';
				context.fillStyle = "#D30035";
			    context.strokeStyle = 'black';
				context.font = '70px Guardians';
				context.fillText("GAME OVER", canvas.width/2, canvas.height/2.5);
				context.strokeText("GAME OVER", canvas.width/2, canvas.height/2.5);
				context.fillText(pontuacao + " pontos", canvas.width/2, canvas.height/1.5);
				context.strokeText(pontuacao + " pontos", canvas.width/2, canvas.height/1.5);
				context.restore();
		    }
	    }
	},

   pontuar: function (pts) {
   	pontuacao += pts;
   },

   initialConfig: function () {
   	this.vidas = 3;
	this.position = { x : this.maxPosition.x/2 , y: this.maxPosition.y };
	this.upgraded = false;
	this.morto = false;
   }

};

