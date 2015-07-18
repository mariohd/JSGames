function RankingOnline() {
	Parse.initialize("L2h9j8kembYZqb5zFNrlw3yV2R7dgxVgeb0s5jq4", "ZjngB69wiAeqYygsEukF45ahWfa5tF9XtcLWcZBj");
	this.ipAddress = "desconhecido";
}

RankingOnline.prototype = {

	enviar: function (nome) {
		var Score = Parse.Object.extend("Score");
		var score = new Score();
		score.save({pontuacao: pontuacao, jogador: nome}).then(function(object) {
			swal("Thanks " + nome + "!", "Your score was saved in our ranking!", "success"); 
		});
		this.listar();
	}, 

	listar: function () {
		var Score = Parse.Object.extend("Score");
		var query = new Parse.Query(Score);
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
		      	data: object.createdAt.toLocaleDateString('pt-BR'),
		      	pais: object.get('pais')
		      });
		    }
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	},

	connected: function () {
		var Conexao = Parse.Object.extend('Conexao');
		var conexao = new Conexao();
		conexao.save({ip: this.ipAddress}); 
	},

	ip:  function (json	){
		this.ipAddress = json.ip;
	}
};