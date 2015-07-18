function RankingOnline() {
	Parse.initialize("L2h9j8kembYZqb5zFNrlw3yV2R7dgxVgeb0s5jq4", "ZjngB69wiAeqYygsEukF45ahWfa5tF9XtcLWcZBj");

	this.Score = Parse.Object.extend("Score");
	this.score = new this.Score();

	this.Conexao = Parse.Object.extend('Conexao');
	this.conexao = new this.Conexao();
	this.ipAddress = "desconhecido";
}

RankingOnline.prototype = {

	enviar: function (nome) {
		this.score.save({pontuacao: pontuacao, jogador: nome}).then(function(object) {
			swal("Parabéns " + nome + "!", "Sua pontuação foi registrada em nosso ranking.", "success"); 
		});
		this.listar();
	}, 

	listar: function () {
		var query = new Parse.Query(this.Score);
		query.descending("pontuacao");
		query.find({
		  success: function(results) {
		  	var table = document.getElementById("azureRanking").tBodies[0];
		  	while(table.rows.length > 0) {
			  table.deleteRow(0);
			}
		    for (var i = 0; i < results.length; i++) {
		      var object = results[i];
		      adicionarNoRanking({
		      	posicao: i + 1,
		      	nome: object.get('jogador'),
		      	pontos: object.get('pontuacao'),
		      	data: object.createdAt.toLocaleDateString('pt-BR') + " " + object.createdAt.toLocaleTimeString('pt-BR')
		      });
		    }
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	},

	connected: function () {
		this.conexao.save({ip: this.ipAddress}); 
	},

	ip:  function (json	){
		this.ipAddress = json.ip;
	}
};