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
	this.vidas = 3;
	this.ultimaMorte = +new Date();
	this.escudo = false;
	this.controleDeTiros = true;
	this.velocidadeDeTiro = 300;
	this.barrier;
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
		if (this.teclado.pressionada(ESPACO) && this.controleDeTiros) {
			this.atirar();
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
			var nave = this;
			if (!this.intervaloDeTiros) {
				nave.intervaloDeTiros = setInterval(function () {
					nave.controleDeTiros = true;
				}, nave.velocidadeDeTiro);
			}
			this.controleDeTiros = false;
			var t = new Tiro(this.context, this);
			animacao.novoSprite(t);
			colisor.novoSprite(t);
			if (this.upgraded) {
				var lateralD = new Tiro(this.context, this, this.position.x, this.position.y + this.imagem.height/this.escala/2 - t.imagem.height/t.escala/2 - 15);
				var lateralE = new Tiro(this.context, this, this.position.x + this.largura() - 11, this.position.y + this.imagem.height/this.escala/2 - t.imagem.height/t.escala/2 - 15);
				animacao.novoSprite(lateralD);
				colisor.novoSprite(lateralD);
				animacao.novoSprite(lateralE);
				colisor.novoSprite(lateralE);
			}
		}
	},

	largura: function () {
		return (this.imagem.width/this.sprite.numColunas)/this.escala;
	},

	upgrade: function () {
		if (!this.upgraded) {
			this.upgraded = !this.upgraded;
		}
	},
	retangulosColisao: function() {
      var rets = 
      [ 
         {x: this.position.x+16, y: this.position.y, largura: 45, altura: 80},
         {x: this.position.x, y: this.position.y+40, largura: 15, altura: 35},
         {x: this.position.x+62, y: this.position.y+40, largura: 15, altura: 35}

      ];
      
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

  	colidiuCom: function(outro) {
      if (outro instanceof Enemy) {
		this.destruir();
		outro.destruir();
      }
   },

	destruir: function () {
		if ( this.imortal() ) return;
		this.matarJogador();
	},

	matarJogador: function () {
		this.morto = true;
        animacao.excluirSprite(this);
        colisor.excluirSprite(this);
        if (this.barrier) this.barrier.destruir();
		var exp1 = new Explosao(this.context, imagens.explosao,
                                 this.position.x, this.position.y, null, null ,this);
        animacao.novoSprite(exp1);
        exp1.fimDaExplosao = function(quem) {
        	quem.morto = true;
		    if (quem.vidas) {
		    	quem.ultimaMorte = new Date().getTime();
				quem.position = { x : quem.maxPosition.x/2 , y: quem.maxPosition.y };
				quem.vidas--;
				quem.upgraded = false;
				quem.morto = false;
				animacao.novoSprite(quem);
				colisor.novoSprite(quem);
		    } else {
		    	gameOver();
		    }
        	updateVidas();
	    }
	},

	pontuar: function (pts) {
		pontuacao += pts;
		updatePontuacao();
	},

	aumentarVelocidadeDeTiro: function () {
		if (this.velocidadeDeTiro > 200 ) {
			this.velocidadeDeTiro -= 20;
			clearInterval(this.intervaloDeTiros);
			var nave = this;
			this.intervaloDeTiros = setInterval(function () {
				nave.controleDeTiros = true;
			}, nave.velocidadeDeTiro);
		}
	},

	initialConfig: function () {
		this.vidas = 3;
		this.upgraded = false;
		this.morto = false;
		this.escudo = false;
		this.restartFase();
	},

	restartFase: function () {
		this.position = { x : this.maxPosition.x/2 , y: this.maxPosition.y };
	},

	imortal: function () {
		return +new Date() - this.ultimaMorte < 1000;
	}

};

