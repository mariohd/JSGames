function Explosao(context, imagem, x, y, escala) {
   this.context = context;
   this.imagem = imagem;
   this.spritesheet = new Spritesheet(context, imagem, 9, 9);
   this.spritesheet.intervalo = 10;
   this.spritesheet.multiLine = true;
   this.x = x;
   this.y = y;
   this.animando = false;
   this.escala = escala || 1;
   
   var explosao = this;
   this.fimDaExplosao = null;
   this.spritesheet.fimDoCiclo = function() {
      animacao.excluirSprite(explosao);
      if (explosao.fimDaExplosao) explosao.fimDaExplosao();
   }

   sons.explosao.volume = 0.05;
   sons.explosao.currentTime = 0.0;
   sons.explosao.play();
}
Explosao.prototype = {
   atualizar: function() {
      
   },
   desenhar: function() {
      this.spritesheet.desenhar({x: this.x, y: this.y}, this.escala);
      this.spritesheet.proximoQuadro();
   }
}