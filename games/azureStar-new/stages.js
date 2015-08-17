function Stage(context, imagem, chefe, inimigo, proxima) {
  this.speed = .6;
  this.imagem = imagem;
  this.context = context;
  this.currentHeight = this.imagem.height - this.context.canvas.height;
  this.intervalo = 1000;
  this.ultimoTempo = null;
  this.gerouChefe = false;
  this.proxima = proxima;
  this.chefe = chefe;
  this.inimigo = inimigo;
};

Stage.prototype = { 
  atualizar: function () {
    if (this.currentHeight >= this.speed) {
      this.currentHeight -= this.speed;
      this.gerarInimigos();
    } else { 
       if (!this.gerouChefe) {
        this.gerarChefe();
      }
    }

  },
  desenhar: function () {
		this.context.drawImage(this.imagem, 0, -this.currentHeight, this.imagem.width, this.imagem.height);
  },

  gerarInimigos: function () {
    var agora = new Date().getTime(); 

    if (! this.ultimoTempo) this.ultimoTempo = agora; 
    if (agora - this.ultimoTempo < this.intervalo) return;

    var enemy = new Enemy(this.context, this.inimigo, 4);
    animacao.novoSprite(enemy);
    colisor.novoSprite(enemy);
    this.ultimoTempo = agora;
  },

  gerarChefe: function () {
    var c = new this.chefe();
    animacao.novoSprite(c);
    colisor.novoSprite(c);
    this.gerouChefe = true;
  },

  initialConfig: function () {
    this.currentHeight = this.imagem.height - this.context.canvas.height;
    this.ultimoTempo = null;
    this.gerouChefe = false;
  },

  proximaFase: function () {
    if (animacao.fase.proxima) {
      player1.restartFase();
      if (player2) player2.restartFase();
      animacao.fase = this.proxima;
    } else {
      vitoria();
    }
  }
}
