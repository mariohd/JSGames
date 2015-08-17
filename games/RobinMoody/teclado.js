var SETA_ESQUERDA = 37;
var SETA_ACIMA = 38;
var SETA_DIREITA = 39;
var SETA_ABAIXO = 40;
var ESPACO = 32;
var ENTER = 13;
var W = 87;
var A = 65;
var S = 83;
var D = 68;
var ENTER = 13;

function Teclado(elemento) {
   this.elemento = elemento;

   this.pressionadas = [];

   this.disparadas = [];

   this.funcoesDisparo = [];

   var teclado = this;

   elemento.addEventListener('keydown', function(evento) {
      var tecla = evento.keyCode; 
      teclado.pressionadas[tecla] = true;

      if (teclado.funcoesDisparo[tecla]) {
          teclado.disparadas[tecla] = true;
          teclado.funcoesDisparo[tecla] (evento) ;
      }
   });

   elemento.addEventListener('keyup', function(evento) {
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   });
}
Teclado.prototype = {
   pressionada: function(tecla, alt) {
      return this.pressionadas[tecla];
   },
   disparou: function(tecla, callback) {
      this.funcoesDisparo[tecla] = callback;
   }
}
