function Explosao(context, imagem, x, y) {
   this.context = context;
   this.imagem = imagem;
   this.spritesheet = new Spritesheet(context, imagem, 9, 9);
   this.spritesheet.intervalo = 10;
   this.spritesheet.multiLine = true;
   this.x = x;
   this.y = y;
   this.animando = false;
   
   var explosao = this;
   this.fimDaExplosao = null;
   this.spritesheet.fimDoCiclo = function() {
      explosao.animacao.excluirSprite(explosao);
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
      this.spritesheet.desenhar({x: this.x, y: this.y});
      this.spritesheet.proximoQuadro();
   }
}