var caminhos = {
	direita: {
		position: function (context, enemy) {
			return {x: -enemy.spritesheet.tamanho.largura , y: context.canvas.height/2 - enemy.spritesheet.tamanho.altura/2  }
		},
		atualizar: function (enemy) {
			if (! enemy.atacando) enemy.position.x += 1;
		},
		direcao: comandos.movimentos.DIREITA,
		ataque: comandos.ataques.lanca.DIREITA
	},
	esquerda: {
		position: function (context, enemy) {
			return {x: context.canvas.width , y: context.canvas.height/2 - enemy.spritesheet.tamanho.altura/2 }
		},
		atualizar: function (enemy) {
			if (! enemy.atacando) enemy.position.x -= 1;
		},
		direcao: comandos.movimentos.ESQUERDA,
		ataque: comandos.ataques.lanca.ESQUERDA
	},
	topo: {
		position: function (context, enemy) {
			return {x: context.canvas.width/2 - enemy.spritesheet.tamanho.largura/2, y: 0 - enemy.spritesheet.tamanho.altura }
		},
		atualizar: function (enemy) {
			if (! enemy.atacando) enemy.position.y += 1;
		},
		direcao: comandos.movimentos.FRENTE,
		ataque: comandos.ataques.lanca.FRENTE
	},
	baixo: {
		position: function (context, enemy) {
			return {x: context.canvas.width/2 - enemy.spritesheet.tamanho.largura/2, y: context.canvas.height }
		},
		atualizar: function (enemy) {
			if (! enemy.atacando) enemy.position.y -= 1;
		},
		direcao: comandos.movimentos.COSTAS,
		ataque: comandos.ataques.lanca.COSTAS
	},

	sortear: function () {
		var c = randomChancesBetween(0, 3);
		switch (c) {
			case 0: 
				return this.topo;
			case 1: 
				return this.esquerda;
			case 2: 
				return this.baixo;
			case 3: 
				return this.direita;
		}
	}
};

function Enemy (context, imagem) {
	this.caminho = caminhos.sortear();
	this.direcao = this.caminho.direcao;
	this.spritesheet = new Spritesheet(context, imagem, 21, 13, 9);
	this.spritesheet.linha = this.direcao;
	this.spritesheet.intervalo = 70;
	this.position = this.caminho.position(context, this);
	this.context = context;
}

Enemy.prototype = {
	desenhar: function () {
		this.spritesheet.linha = this.direcao;
		if (! this.excluir) this.spritesheet.desenhar(this.position.x, this.position.y);
	},

	atualizar: function () {
		this.spritesheet.proximoQuadro();
		if (! this.morto) this.caminho.atualizar(this);
	},
	retangulosColisao: function() {
      var rets = 
      [ 
         {x: this.position.x + this.spritesheet.tamanho.largura/4, y: this.position.y, largura: this.spritesheet.tamanho.largura/2, altura: this.spritesheet.tamanho.altura }
      ];
      
      if ( this.context.colisor.desenharQuadrados ) {
	      
	      for (var i in rets) {
			this.context.save();
			this.context.strokeStyle = 'yellow';
			this.context.strokeRect(rets[i].x, rets[i].y, rets[i].largura, 
			        rets[i].altura);
			this.context.restore();
	      }    
	  }
      return rets;
  	},

  	colidiuCom: function(outro) {
      if (outro instanceof Player) {
      	if (! this.atacando ) {
      		this.atacando = true;
	      	this.spritesheet.intervalo = 150;
	      	this.spritesheet.coluna = 0;
			this.spritesheet.usar = 6;
	      	this.direcao = this.caminho.ataque;
	      	this.spritesheet.fimDoCiclo = function () {
	      		outro.hp -= 5;
	      	};
      	}
      }
   },

   morrer: function () {
	this.morto = true;
	this.direcao = comandos.gerais.MORTE;
	this.spritesheet.intervalo = 75;
	this.spritesheet.coluna = 0;
	this.spritesheet.usar = 6;
	this.spritesheet.fimDoCiclo = function () {
		this.excluir = true;
	}.bind(this);
   }
};

