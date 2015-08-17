function Spritesheet(context, imagem, linhas, colunas, use) { 
   this.context = context; 
   this.imagem = imagem; 
   this.numLinhas = linhas; 
   this.numColunas = colunas; 
   this.usar = use;
   this.intervalo = 0; 
   this.linha = 0; 
   this.coluna = 0; 
   this.fimDoCilo = null;
   this.tamanho = {
      largura: this.imagem.width / this.numColunas, 
      altura: this.imagem.height / this.numLinhas, 
   }
   this.acoes = [];
} 
Spritesheet.prototype = { 
   proximoQuadro: function() {
      var agora = new Date().getTime(); 

      // Se ainda não tem último tempo medido 
      if (! this.ultimoTempo) this.ultimoTempo = agora; 

      // Já é hora de mudar de coluna? 
      if (agora - this.ultimoTempo < this.intervalo) return;

      if (this.coluna < this.usar - 1) {
         this.coluna++; 
         if (this.acoes[this.coluna]) this.acoes[this.coluna]();
      }
      else {
         this.coluna = 0;
         
         // Avisar que acabou um ciclo!
         if (this.fimDoCiclo) this.fimDoCiclo();
      }

      // Guardar hora da última mudança
      this.ultimoTempo = agora;
   },
   desenhar: function(x, y) {
      this.context.drawImage( 
         this.imagem, 
         this.tamanho.largura * this.coluna, 
         this.tamanho.altura * this.linha, 
         this.tamanho.largura, 
         this.tamanho.altura, 
         x, 
         y, 
         this.tamanho.largura, 
         this.tamanho.altura 
      ); 
   },

   acaoIntermediaria: function (coluna, execute) {
      this.acoes[coluna] = execute;
   },
}
