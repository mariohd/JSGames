var comandos = {
	gerais: {
		MORTE: 20,
		ESQUERDA: -5,
		DIREITA: +5, 
		COSTAS: -5,
		CIMA: +5
	},
	ataques : {
		lanca: {
			COSTAS: 4, ESQUERDA: 5, FRENTE: 6, DIREITA: 7
		},
		arco: {
			COSTAS: 16, ESQUERDA: 17, FRENTE: 18, DIREITA: 19
		}
	},
	movimentos: {
		COSTAS: 8, ESQUERDA: 9, FRENTE: 10, DIREITA: 11
	}
};

function Player(context, imagem) {
	this.direcao = comandos.ataques.arco.FRENTE;
	this.spritesheet = new Spritesheet(context, imagem, 21, 13, 13);
	this.spritesheet.linha = this.direcao;
	this.spritesheet.intervalo = 75;
	this.position = {x: context.canvas.width/2 - this.spritesheet.tamanho.largura/2 , y: context.canvas.height/2 - this.spritesheet.tamanho.altura/2 };
	this.atirando = false;
	this.context = context;
	this.hp = 100;
	this.vidas = 3;
	this.mobile = mobilecheck();
};

Player.prototype = {
	desenhar: function () {
		this.spritesheet.linha = this.direcao;
		this.spritesheet.desenhar(this.position.x, this.position.y);
		this.hud();
	},
	hud: function () {
		this.context.save();
		this.context.shadowOff();
		this.context.drawImage(this.context.assets.imagens.hud, 20, 20);
		this.context.font ='80px PiecesOfEight';
		this.context.fillStyle = "green";
		if (50 >= this.hp) this.context.fillStyle = "gold";
		if (25 >= this.hp) this.context.fillStyle = "red";
		this.context.strokeStyle = "black";
	    this.context.textAlign = 'center';
		this.context.fillText(this.hp + "", 100, 260);
		this.context.strokeText(this.hp+ "", 100, 260);
		this.context.restore();
	},

	atualizar: function () {
		if (this.atirando || this.mobile) {
			this.spritesheet.proximoQuadro();
			this.spritesheet.fimDoCiclo = function() {
				this.atirando = false;
			}.bind(this);				

			this.spritesheet.acaoIntermediaria(8, function () {
				var position = {x: this.position.x + this.spritesheet.tamanho.largura/2, y: this.position.y + this.spritesheet.tamanho.altura/1.9 - 5};
				var velocidade = 0, eixo = 'y', imagem;
				switch(this.direcao) {
					case comandos.ataques.arco.ESQUERDA:
						velocidade = comandos.gerais.ESQUERDA;
						eixo = 'x';
						imagem = this.context.assets.imagens.flechasEsquerda;
						break;
					case comandos.ataques.arco.DIREITA:
						velocidade = comandos.gerais.DIREITA;
						eixo = 'x';
						imagem = this.context.assets.imagens.flechasDireita;
						break;
					case comandos.ataques.arco.COSTAS:
						velocidade = comandos.gerais.COSTAS;
						eixo = 'y';
						imagem = this.context.assets.imagens.flechasCima;
						break;
					case comandos.ataques.arco.FRENTE:
						velocidade = comandos.gerais.CIMA;
						imagem = this.context.assets.imagens.flechasBaixo;
						eixo = 'y';
						break;

				}
				var f = new Flecha(this.context, imagem, position, velocidade, eixo);
				this.context.assets.sprites.push(f);
				this.context.colisor.sprites.push(f);
			}.bind(this));
		}
	},

	atirar: function () {
		if (! this.atirando) this.atirando = true;
	},
	retangulosColisao: function() {
      var rets = 
      [ 
        {x: this.position.x + this.spritesheet.tamanho.largura/4, y: this.position.y, largura: this.spritesheet.tamanho.largura/2, altura: this.spritesheet.tamanho.altura }
      ];
      
      if ( this.context.colisor.desenharQuadrados ) {
	      
	      for (var i in rets) {
			this.context.save();
			this.context.shadowBlur = 0;
			this.context.shadowOffsetX = 0;
			this.context.shadowOffsetY = 0;
			this.context.strokeStyle = 'yellow';
			this.context.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
			        rets[i].altura);
			this.context.restore();
	      }    
	  }
      return rets;
  	},

  	colidiuCom: function(outro) {
   }
};