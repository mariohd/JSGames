function Tiro(context, nave, x, y) {
   this.context = context;
   this.nave = nave;
   this.imagem = imagens.tiro;
   this.sprite = new Spritesheet(this.context, this.imagem, 1, 1);
   this.largura = this.imagem.width;
   this.altura = this.imagem.height;
   this.velocidade = 500;
   this.escala = .9;
   this.imgExplosao = imagens.explosao;
   this.x = x || this.nave.position.x + (this.nave.largura()/2 - this.imagem.width/this.escala/2); 
   this.y = y || this.nave.position.y - (this.imagem.height/this.escala);
   sons.tiro.currentTime = 0.0;
   sons.tiro.volume = 0.02;
   sons.tiro.play();
}
Tiro.prototype = {
   atualizar: function() {
      this.y -= this.velocidade * animacao.decorrido / 1000;
      if (this.y < -this.altura) {
         animacao.excluirSprite(this);
         colisor.excluirSprite(this);
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
         this.nave.pontuar(100);
         outro.destruir();
         animacao.excluirSprite(this);
         this.colisor.excluirSprite(this);
      }
   }
}
