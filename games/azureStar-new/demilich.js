function Demilich() {
	this.context = context;
	this.imagem = imagens.boss3_1;
	this.escala = 1.3;
	this.sprite = new Spritesheet(context, this.imagem, 1, 1);
	this.sprite.intervalo = 40;
	this.sprite.inverter = true;
	this.maxPosition = { x : 740, y: 350 };
	this.minPosition = { x : 0, y: 0 };
	this.position = {x: Math.random() * this.maxPosition.x , y: -300 };
	this.velocidade = 5;
	this.irParaDireita = true;
	this.irParaEsquerda = false;
	this.descendo = true;
	this.life = 15;
	this.morto = false;
};

Demilich.prototype = Object.create(Chefe.prototype);

Demilich.prototype.destruir = function () {
	if (!this.morto) {
		animacao.excluirSprite(this);
		colisor.excluirSprite(this);

		var fase2 = new Demilich2(this.position);
		animacao.novoSprite(fase2);
		colisor.novoSprite(fase2);
		this.morto = true;
	}
};

Demilich.prototype.retangulosColisao = function() {
	var rets = 
	[ 
		{x: this.position.x + 100, y: this.position.y + 5, largura: (this.imagem.width/this.sprite.numColunas)/this.escala - 200, altura: 155} , 
		{x: this.position.x + 55, y: this.position.y, largura: (this.imagem.width/this.sprite.numColunas)/this.escala - 200, altura: this.imagem.height/this.escala} ,
		{x: this.position.x + 145, y: this.position.y, largura: (this.imagem.width/this.sprite.numColunas)/this.escala - 200, altura: this.imagem.height/this.escala},
		{x: this.position.x, y: this.position.y + 40, largura: (this.imagem.width/this.sprite.numColunas)/this.escala, altura: 40} ,
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

Demilich.prototype.atualizar = Gygas.prototype.atualizar;

Demilich.prototype.pontuacao = function () {
	return 500;
};


function Demilich2(position) {
	this.context = context;
	this.imagem = imagens.boss3_2;
	this.escala = 1;
	this.sprite = new Spritesheet(context, this.imagem, 1, 1);
	this.sprite.intervalo = 40;
	this.sprite.inverter = true;
	this.maxPosition = { x : 740, y: 350 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = position;
  	this.velocidade = 5;
  	this.irParaDireita = true;
  	this.irParaEsquerda = false;
  	this.descendo = true;
  	this.life = 20;
  	this.intervaloDeTiro = 400;
};

Demilich2.prototype = Object.create(Chefe.prototype);

Demilich2.prototype.destruir = function () {
	if (!this.morto) {
		animacao.excluirSprite(this);
		colisor.excluirSprite(this);

		var fase3 = new Demilich3(this.position);
		animacao.novoSprite(fase3);
		colisor.novoSprite(fase3);
		this.morto = true;
	}
};

Demilich2.prototype.retangulosColisao = function() {
	var rets = 
	[ 
		{x: this.position.x + 40, y: this.position.y, largura: 40, altura: (this.imagem.height/this.escala) - 70},
		{x: this.position.x + 80, y: this.position.y + 40, largura: 50, altura: (this.imagem.height/this.escala) - 100},
		{x: this.position.x + 130, y: this.position.y, largura: 40, altura: (this.imagem.height/this.escala) - 70},
		{x: this.position.x, y: this.position.y + 150, largura: 40, altura: (this.imagem.height/this.escala) - 200},
		{x: this.position.x + 170, y: this.position.y + 150, largura: 40, altura: (this.imagem.height/this.escala) - 200},
		{x: this.position.x + 40, y: this.position.y + 250, largura: 20, altura: (this.imagem.height/this.escala) - 250},
		{x: this.position.x + 150, y: this.position.y + 250, largura: 20, altura: (this.imagem.height/this.escala) - 250},
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

Demilich2.prototype.atualizar = Rariax.prototype.atualizar;

Demilich2.prototype.pontuacao = function () {
	return 600;
};


Demilich2.prototype.atirar = function () {
	var agora = new Date().getTime(); 
    if (! this.ultimoTempo) this.ultimoTempo = agora; 
    if (agora - this.ultimoTempo < this.intervaloDeTiro) return;

    var t = new TiroInimigo(this.context, this, null, null, .5);
    animacao.novoSprite(t);
    colisor.novoSprite(t);

    this.ultimoTempo = agora;
};

function Demilich3(position) {
	this.context = context;
	this.imagem = imagens.boss3_3;
	this.escala = 1.1;
	this.sprite = new Spritesheet(context, this.imagem, 1, 1);
	this.sprite.intervalo = 40;
	this.sprite.inverter = true;
	this.maxPosition = { x : 740, y: 350 };
  	this.minPosition = { x : 0, y: 0 };
	this.position = position;
  	this.velocidade = 5;
  	this.irParaDireita = true;
  	this.irParaEsquerda = false;
  	this.descendo = true;
  	this.life = 25;
  	this.intervaloDeMovimento = 10000;
  	this.intervaloDeTiro = 500;
  	this.movimento = Rariax.prototype.atualizar;
};

Demilich3.prototype = Object.create(Chefe.prototype);


Demilich3.prototype.retangulosColisao = function() {
	var rets = 
	[ 
		{x: this.position.x + 100, y: this.position.y + 70, largura: (this.imagem.width/this.sprite.numColunas)/this.escala - 200, altura: 180} , //centro
		{x: this.position.x + 75, y: this.position.y + 200, largura: 25, altura: 170} , // pata frontal esquerda
		{x: this.position.x + 220, y: this.position.y + 200, largura: 25, altura: 170} , // pata fronta direita
		{x: this.position.x + 40, y: this.position.y + 220, largura: 35, altura: 105} , //pata lateral esqueda
		{x: this.position.x + 245, y: this.position.y + 220, largura: 35, altura: 105} , //pata lateral direita
		{x: this.position.x + 285, y: this.position.y + 160, largura: 35, altura: 45} , //garra lateral direita
		{x: this.position.x + 260, y: this.position.y + 130, largura: 25, altura: 25} , //mid garra lateral direita
		{x: this.position.x + 225, y: this.position.y + 20, largura: 35, altura: 120} , //corpo traseiras direita
		{x: this.position.x + 260, y: this.position.y + 5, largura: 25, altura: 30} , //pata 1 traseira direita
		{x: this.position.x + 260, y: this.position.y + 55, largura: 15, altura: 30} , // pata 2 traseira direita
		{x: this.position.x, y: this.position.y + 160, largura: 35, altura: 45} , //garra garra lateral esquerda
		{x: this.position.x + 35, y: this.position.y + 130, largura: 25, altura: 25} , //mid garra lateral esquerda
		{x: this.position.x + 60, y: this.position.y + 20, largura: 35, altura: 120} , //corpo traseiras esquerda
		{x: this.position.x + 35, y: this.position.y + 5, largura: 25, altura: 30} , //pata 1 traseira esquerda
		{x: this.position.x + 45, y: this.position.y + 55, largura: 15, altura: 30} , //pata 2 traseira esquerda
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

Demilich3.prototype.atualizar = function () {
    this.movimento();

	var agora = new Date().getTime(); 
    if (! this.ultimoTempoMovimento) this.ultimoTempoMovimento = agora; 
    if (agora - this.ultimoTempoMovimento < this.intervaloDeMovimento) return;
	this.ultimoTempoMovimento = agora;

    this.movimento = this.movimento == Gygas.prototype.atualizar ? Rariax.prototype.atualizar : Gygas.prototype.atualizar;
};

Demilich3.prototype.pontuacao = function () {
	return 5000;
};

Demilich3.prototype.destruir = function () {
	animacao.excluirSprite(this);
	colisor.excluirSprite(this);

	var exp1 = new Explosao(this.context, imagens.explosao,
	                   this.position.x + 75, this.position.y + 60, 1);

	var exp2 = new Explosao(this.context, imagens.explosao,
	                   this.position.x + 120, this.position.y, 1);

	var exp3 = new Explosao(this.context, imagens.explosao,
	                   this.position.x, this.position.y + 80, 1);

	animacao.novoSprite(exp1);
	animacao.novoSprite(exp2);
	animacao.novoSprite(exp3);

	exp3.fimDaExplosao = function () {
		pontuacao += animacao.fase.chefe.prototype.pontuacao();
		updatePontuacao();
		animacao.fase.proximaFase();
	}; 
};


Demilich3.prototype.atirar = function () {
	var agora = new Date().getTime(); 
    if (! this.ultimoTempo) this.ultimoTempo = agora; 
    if (agora - this.ultimoTempo < this.intervaloDeTiro) return;

    var t = new EspecialChefe(this.context, this, 4);
    animacao.novoSprite(t);
    colisor.novoSprite(t);

    this.ultimoTempo = agora;
};

function EspecialChefe(context, nave, escala) {
	this.context = context;
	this.nave = nave;
	this.imagem = imagens.tiro_boss_3;
	this.escala = escala || 1;
	this.sprite = new Spritesheet(this.context, this.imagem, 1, 2);
	this.largura = this.imagem.width;
	this.altura = this.imagem.height;
	this.velocidade = 500;
	this.imgExplosao = imagens.explosao;
	this.x = (this.nave.position.x + (this.nave.largura()/2 - (this.imagem.width/this.sprite.numColunas/this.escala)/2));
	this.y = (this.nave.position.y + this.nave.imagem.height/this.nave.escala - 80);
	sons.tiro.currentTime = 0.0;
	sons.tiro.volume = 0.02;
	sons.tiro.play();
}

EspecialChefe.prototype = Object.create(TiroInimigo.prototype);

EspecialChefe.prototype.desenhar = function() {
      this.sprite.desenhar({x: this.x, y: this.y - this.imagem.height/this.sprite.numColunas}, this.escala);      
   };

EspecialChefe.prototype.retangulosColisao = function() {
  var rets = 
  [ 
     {x: this.x, y: this.y - (this.imagem.height/this.sprite.numColunas/this.escala)*2, largura: this.imagem.width/this.sprite.numColunas/this.escala, altura: -this.imagem.height/this.escala},
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

EspecialChefe.prototype.atualizar= function() {
      this.y += this.velocidade * animacao.decorrido / 1000;
      if (this.y > 900) {
         animacao.excluirSprite(this);
         colisor.excluirSprite(this);
      }
   };

EspecialChefe.prototype.colidiuCom = function(outro) {
      if (outro instanceof Player) {
         outro.destruir();
         animacao.excluirSprite(this);
         colisor.excluirSprite(this);
      }
   }
