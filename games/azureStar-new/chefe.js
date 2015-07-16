var BOSS_MOVIMENTS = [];

function Chefe(context, imagem, escala) {
	this.context = context;
	this.imagem = imagem;
	this.escala = escala;
	this.sprite = new Spritesheet(context, imagem, 1, 67);
	this.sprite.intervalo = 40;
	this.sprite.inverter = true;
	this.maxPosition = { x : 740, y: 350 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = {x: Math.random() * this.maxPosition.x , y: -300 };
  	this.velocidade = 5;
  	this.irParaDireita = true;
  	this.irParaEsquerda = false;
  	this.descendo = true;
	var self = this;
	this.sprite.fimDoCiclo2 = function () {

	};
};

Chefe.prototype = {
	atualizar: function () {
		if (this.position.y < 0 ) {
			this.position.y += this.velocidade;
		} /*else {
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
		}*/
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
};