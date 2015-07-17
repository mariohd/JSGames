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
  this.imgExplosao = imagens.explosao;
  this.escala = escala;
  this.ultimoTempo;
  this.intervaloDeTiro = 500 + (Math.random() * 1000);
  this.drops = [];
  this.drops[5] = {object: Escudo, image: imagens.escudo };
  this.drops[10] = { object: Cannons, image: imagens.cannons };
  this.drops[15] = {object: Vida, image: imagens.vida };
  this.drops[20] = 0;
} 

Enemy.prototype = {
  atualizar: function () {
    this.movementFunction.call(this);
    if (this.position.y > (this.maxPosition.y + this.imagem.y/this.escala)) {
      animacao.excluirSprite(this);
      colisor.excluirSprite(this);
    }

    var agora = new Date().getTime(); 

    if (! this.ultimoTempo) this.ultimoTempo = agora; 
    if (agora - this.ultimoTempo < this.intervaloDeTiro) return;

    var t = new TiroInimigo(this.context, this);
    animacao.novoSprite(t);
    colisor.novoSprite(t);

    this.ultimoTempo = agora;
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
      if ( colisor.desenharQuadrados() ) {
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
  },

  droparUpgrade: function () {
    var resultado = chanceRandomica(1, 20);
    if (this.drops[resultado]) {
      var u = new this.drops[resultado].object(this.context, this.drops[resultado].image, this.position );
      animacao.novoSprite(u);
      colisor.novoSprite(u);
    }
  },

  largura: function () {
    return (this.imagem.width/this.sprite.numColunas)/this.escala;
  },

  destruir: function () {
    this.morto = true;
    animacao.excluirSprite(this);
    colisor.excluirSprite(this);
    var exp1 = new Explosao(this.context, imagens.explosao,
                                 this.position.x, this.position.y);
    animacao.novoSprite(exp1);
    this.droparUpgrade();
  },

}; 











