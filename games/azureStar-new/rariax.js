function Rariax() {
	this.context = context;
	this.imagem = imagens.boss2;
	this.escala = 1.6;
	this.sprite = new Spritesheet(context, this.imagem, 1, 4);
	this.sprite.intervalo = 40;
	this.maxPosition = { x : 670, y: 650 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = {x: Math.random() * this.maxPosition.x , y: -300 };
  	this.velocidade = 7;
  	this.irParaDireita = true;
  	this.irParaEsquerda = false;
  	this.descendo = true;
  	this.life = 50;
  	this.intervaloDeTiro = 500;
}

Rariax.prototype = Object.create(Chefe.prototype);

Rariax.prototype.retangulosColisao = function() {
	var rets = 
	[ 
		{x: this.position.x, y: this.position.y + (this.imagem.height/this.escala)/2.5, largura: (this.imagem.width/this.sprite.numColunas)/this.escala, altura: (this.imagem.height/this.escala)/3},
		{x: this.position.x, y: this.position.y + (this.imagem.height/this.escala)/4, largura: 20, altura: (this.imagem.height/this.escala)/1.8},
		{x: this.position.x + ((this.imagem.width/this.sprite.numColunas)/this.escala) - 20, y: this.position.y + (this.imagem.height/this.escala)/4, largura: 20, altura: (this.imagem.height/this.escala)/1.8},
		{x: this.position.x + ((this.imagem.width/this.sprite.numColunas)/this.escala)/3.2, y: this.position.y, largura: 40, altura: (this.imagem.height/this.escala) - 20},
		{x: this.position.x + ((this.imagem.width/this.sprite.numColunas)/this.escala)/1.8, y: this.position.y, largura: 40, altura: (this.imagem.height/this.escala) - 20},
		{x: this.position.x + ((this.imagem.width/this.sprite.numColunas)/this.escala)/2.2, y: this.position.y + 50, largura: 30, altura: (this.imagem.height/this.escala) - 50}

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
	};

Rariax.prototype.atualizar = function () {
		if (this.position.y < 0 ) {
			this.position.y += this.velocidade;
		} else {
			if (this.estocada) {
				if (this.descendo) {
					if (this.limitesDeY(this.position.y + this.velocidade)) {
						this.position.y += this.velocidade * 2;
					} else {
						this.descendo = false;
					}
				} else {
					this.estocada = false;	
					this.descendo = true;
					this.position.y = -300;
				}
			} else {
				this.atirar();
				if (this.irParaEsquerda) {
					if (this.limitesDeX(this.position.x-this.velocidade)) {
						this.position.x -= this.velocidade;
					} else {
						this.irParaEsquerda = false;
						this.irParaDireita = true;
					}
				} else {
					if (this.limitesDeX(this.position.x+this.velocidade)) {
						this.position.x += this.velocidade;
					} else {
						this.irParaEsquerda = true;
						this.irParaDireita = false;
					}
				}
				if (this.life < 25)
					this.estocada = chanceRandomica(0,100) == 15;
			}
		}
	};
Rariax.prototype.atirar = function () {
	var agora = new Date().getTime(); 

    if (! this.ultimoTempo) this.ultimoTempo = agora; 
    if (agora - this.ultimoTempo < this.intervaloDeTiro) return;

    var t = new TiroInimigo(this.context, this, null, null, .5);
    animacao.novoSprite(t);
    colisor.novoSprite(t);

    this.ultimoTempo = agora;
};

Rariax.prototype.pontuacao = function () {
	return 1500;
}