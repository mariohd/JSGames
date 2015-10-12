function Person () {};

Person.prototype = {
	MOVEMENTS: {
		ATTACKS : {
			MAGIC: {
				BACK: 0, LEFT: 1, FRONT: 2, RIGHT: 3
			},
			SPEAR: {
				BACK: 4, LEFT: 5, FRONT: 6, RIGHT: 7
			},
			SWORD: {
				BACK: 12, LEFT: 13, FRONT: 14, RIGHT: 15
			},
			BOW: {
				BACK: 16, LEFT: 17, FRONT: 18, RIGHT: 19
			}	
		},
		WALK: {
			BACK: 8, LEFT: 9, FRONT: 10, RIGHT: 11
		},
		DEATH: 20
	},

	draw: function () {
		this.sprite.proximoQuadro();
		this.sprite.desenhar(this.position, this.escala);
	},

	retangulosColisao: function() {
      var rets = 
      [ 
        Object.create({x: this.position.x + this.sprite.size.width/4, y: this.position.y, largura: this.sprite.size.width/2, altura: this.sprite.size.height })
      ];
      
      if ( this.context.debug ) {
	      
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