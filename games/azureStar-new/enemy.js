var MOVEMENT_MODES = [
  function () {
    this.position.y += 3;
  },
  function () {
    this.position.y += 1.5;
    if (this.goToLeft) {
      this.position.x += 3;
      if (this.position.x > this.maxPosition.x ) {
        this.goToLeft = false;
        this.goToRight = true;
      }
    } else {
      this.position.x -= 3;
      if (this.position.x < this.minPosition.x) {
        this.goToLeft = true;
        this.goToRight = false;
      }
    }
  },
  function () {
    this.position.y += 1;
    if (this.goToLeft) {
      this.position.x += 3;
      if (this.position.x > this.maxPosition.x) {
        this.goToLeft = false;
        this.goToRight = true;
      }
    } else {
      this.position.x -= 3;
      if (this.position.x < this.minPosition.x) {
        this.goToLeft = true;
        this.goToRight = false;
      }
    }
  }
];

var chances = 0;
function Enemy(context, imagem, escala) {
  this.context = context;
  this.imagem = imagem;
  this.sprite = new Spritesheet(context, this.imagem, 1, 4);
  this.sprite.intervalo = 180;
  this.maxPosition = { x : 930, y: 520 };
  this.minPosition = { x : 0, y: 0 };
  this.position = { x : Math.random() * (this.maxPosition.x - 50) + 50, y:  this.minPosition.y };
  this.goToLeft = Math.random().toFixed() == 0 ? false : true;
  this.goToRight = !this.goToLeft;
  this.movementFunction = MOVEMENT_MODES[(Math.random() * 2).toFixed()];
  this.imgExplosao = new Image();
  this.imgExplosao.src = 'img/explosion.png';
  this.escala = escala;
} 


Enemy.prototype = {
  atualizar: function () {
    this.movementFunction.call(this);
    if (this.position.y > (this.maxPosition.y + this.imagem.y/this.escala)) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);
    }

  },
  desenhar: function () {
    this.sprite.desenhar(this.position, this.escala);
    this.sprite.proximoQuadro();
  },

  retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
        {x: this.position.x + 18, y: this.position.y, largura: this.imagem.width/this.sprite.numColunas/this.escala/2, altura: this.imagem.height/this.escala},
        {x: this.position.x, y: this.position.y + 18, largura: 18, altura: (this.imagem.height/this.escala)/2},
        {x: this.position.x + 54, y: this.position.y + 18, largura: 18, altura: (this.imagem.height/this.escala)/2},

      ];
      
      // Desenhando os retângulos para visualização
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
         this.animacao.excluirSprite(this);
         this.animacao.excluirSprite(outro);
         this.colisor.excluirSprite(this);
         this.colisor.excluirSprite(outro);
         
         var exp1 = new Explosao(this.context, imagens.explosao,
                                 this.position.x, this.position.y);
         var exp2 = new Explosao(this.context, imagens.explosao,
                                 outro.position.x, outro.position.y);
         
         this.animacao.novoSprite(exp1);
         this.animacao.novoSprite(exp2);
      }

   },

   droparUpgrade: function () {
    if ( (Math.random() + chances) > 1 ) {
      chances = 0;
      var u = new Upgrade(this.context, this, this.position );
      this.animacao.novoSprite(u);
      this.colisor.novoSprite(u);
    } else {
      if (chances < 0.5) {
        chances += 0.05;
      }
    } 
   }


}; 











