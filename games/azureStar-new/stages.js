function Stage(context, imagem, colisor) {
  this.speed = .6;
  this.imagem = imagem;
  this.context = context;
  this.currentHeight = this.imagem.height - this.context.canvas.height;
  this.intervalo = 1000;
  this.ultimoTempo = null;
  this.colisor = colisor;
  this.gerouChefe = false;
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

    var enemy = new Enemy(this.context, imagens.enemy1, 4);
    animacao.novoSprite(enemy);
    this.colisor.novoSprite(enemy);
    this.ultimoTempo = agora;
  },

  gerarChefe: function () {
    var chefe = new Chefe(this.context, imagens.boss1, 1);
    animacao.novoSprite(chefe);
    this.gerouChefe = true;
  },

  initialConfig: function () {
    this.currentHeight = this.imagem.height - this.context.canvas.height;
    this.ultimoTempo = null;
    this.gerouChefe = false;
  }
}
