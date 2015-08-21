function Flecha(context, imagem, position, velocidade, eixo) {
	this.velocidade = velocidade;
	this.spritesheet = new Spritesheet(context, imagem, 1, 1, 1);
	this.position = position;
	this.context = context;
	this.eixo = eixo;
}

Flecha.prototype = {

	desenhar: function () {
		this.spritesheet.desenhar(this.position.x, this.position.y);
	},

	atualizar: function () {
		if (this.eixo == 'x') {
			this.position.x += this.velocidade;
		} else {
			this.position.y += this.velocidade;
		}
	},
	retangulosColisao: function() {
      var rets = 
      [ 
        {x: this.position.x, y: this.position.y, largura: this.spritesheet.tamanho.largura, altura: this.spritesheet.tamanho.altura }
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
		if (outro instanceof Enemy) {
			outro.morrer();
			this.excluir = true;
		}
   }
}