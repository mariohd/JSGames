function Tiro(context, nave, x, y) {
   this.context = context;
   this.nave = nave;
   this.imagem = new Image();
   this.x = x;
   this.y = y;
   var self = this;
   this.imagem.onload = function () {
      if ( !x ) {
         self.x = self.nave.position.x + (self.nave.largura()/2 - self.imagem.width/self.escala/2); 
      }
      if ( !y ) {
         self.y = self.nave.position.y - (self.imagem.height/self.escala);
      }  
   };
   this.imagem.src = "img/bullet.png";
   this.sprite = new Spritesheet(this.context, this.imagem, 1, 1);
   this.largura = this.imagem.width;
   this.altura = this.imagem.height;
   this.velocidade = 500;
   this.escala = .9;
   this.imgExplosao = new Image();
   this.imgExplosao.src = 'img/explosion.png';
   sons.tiro.currentTime = 0.0;
   sons.tiro.volume = 0.02;
   sons.tiro.play();
}
Tiro.prototype = {
   atualizar: function() {
      this.y -= this.velocidade * this.animacao.decorrido / 1000;
      if (this.y < -this.altura) {
         this.animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   },

   desenhar: function() {
      this.sprite.desenhar({x: this.x, y: this.y }, this.escala);      
   },

   retangulosColisao: function() {
      // Estes valores vão sendo ajustados aos poucos
      var rets = 
      [ 
         {x: this.x, y: this.y, largura: this.imagem.width, altura: this.imagem.height},
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
         var exp = new Explosao(this.context, this.imgExplosao,
                                 outro.position.x, outro.position.y);
         outro.droparUpgrade();
         this.animacao.novoSprite(exp);
      }
   }
}
