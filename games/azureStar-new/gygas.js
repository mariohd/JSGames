function Gygas() {
	this.context = context;
	this.imagem = imagens.boss1;
	this.escala = 1.6;
	this.sprite = new Spritesheet(context, this.imagem, 1, 67);
	this.sprite.intervalo = 40;
	this.sprite.inverter = true;
	this.maxPosition = { x : 740, y: 350 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = {x: Math.random() * this.maxPosition.x , y: -300 };
  	this.velocidade = 5;
  	this.irParaDireita = true;
  	this.irParaEsquerda = false;
  	this.descendo = true;
  	this.life = 30;
}

Gygas.prototype = Object.create(Chefe.prototype);

Gygas.prototype.retangulosColisao = function() {
	  var rets = 
	  [ 
		{x: this.position.x + 100, y: this.position.y + 10, largura: (this.imagem.width/this.sprite.numColunas)/this.escala - 200, altura: (((this.imagem.height)/this.escala) - 20) + .2 * (this.sprite.numColunas - this.sprite.coluna)} , //centro
		{x: this.position.x + 75, y: this.position.y + 180, largura: 25, altura: 40 + .8 * (this.sprite.numColunas - this.sprite.coluna) }, // boca esquerda
		{x: this.position.x + 165, y: this.position.y + 180, largura: 25, altura: 40 + .8 * (this.sprite.numColunas - this.sprite.coluna) }, //boca direta
		{x: this.position.x + 65, y: this.position.y + 30, largura: 35, altura: 130 }, //lateral superior da esquerda
		{x: this.position.x + 165, y: this.position.y + 30, largura: 35, altura: 130 }, //lateral superior da direita
		{x: (this.position.x) + (2 * (this.sprite.coluna)), y: this.position.y + 60, largura: 70, altura: 20 }, // asa esquerda top
		{x: (this.position.x) + (1 * (this.sprite.coluna)), y: this.position.y + 90, largura: 30, altura: 20 }, // asa esquerda mid
		{x: (this.position.x) + 30 + (1 * (this.sprite.coluna)), y: this.position.y + 120, largura: 20, altura: 30 }, // asa esquerda bottom
		{x: (this.position.x) + 200 - (2 * (this.sprite.coluna)), y: this.position.y + 60, largura: 70, altura: 20 }, // asa direita top
		{x: (this.position.x) + 230 - (1 * (this.sprite.coluna)), y: this.position.y + 90, largura: 30, altura: 20 }, // asa direita mid
		{x: (this.position.x) + 210 - (1 * (this.sprite.coluna)), y: this.position.y + 120, largura: 20, altura: 30 } // asa direita bottom
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

Gygas.prototype.atualizar = function () {
		if (this.position.y < 0 ) {
			this.position.y += this.velocidade;
		} else {
			if (this.descendo) {
				if (this.limitesDeY(this.position.y + this.velocidade)) {
					this.position.y += this.velocidade;
				} else {
					this.descendo = false;
					this.irParaEsquerda = true;

				}
			} else {
				if (this.limitesDeY(this.position.y - this.velocidade)) {
					this.position.y -= this.velocidade;
				} else {
					this.descendo = true;
					this.irParaEsquerda = false;

				}
			}
			if (this.irParaDireita) {
				if (this.limitesDeX(this.position.x+this.velocidade)) {
					this.position.x += this.velocidade;
				} else {
					this.irParaEsquerda = true;
					this.irParaDireita = false;
					this.descendo = true;
				}
			}
			if (this.irParaEsquerda) {
				if (this.limitesDeX(this.position.x-this.velocidade)) {
					this.position.x -= this.velocidade;
				} else {
					this.irParaEsquerda = false;
					this.irParaDireita = true;
					this.descendo = false;
				}
			}
		}
	};

Gygas.prototype.pontuacao = function () {
	return 1000;
};