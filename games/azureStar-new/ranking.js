function RankingOnline() {
	Parse.initialize("L2h9j8kembYZqb5zFNrlw3yV2R7dgxVgeb0s5jq4", "ZjngB69wiAeqYygsEukF45ahWfa5tF9XtcLWcZBj");
	this.ipAddress = "unknown";
	this.country = "World";
	this.duplicity = true;
	this.dataTable;
}

RankingOnline.prototype = {

	enviar: function (nome) {
		if (this.duplicity) {
			var Score = Parse.Object.extend("Score");
			var score = new Score();
			score.save({pontuacao: pontuacao, jogador: nome, pais: this.country}).then(function(object) {
				swal("Thanks " + nome + "!", "Your score was saved in our ranking!", "success");
			});
			this.listar();
			this.avoidDuplicity();
		}
	}, 

	listar: function () {
		var Score = Parse.Object.extend("Score");
		var query = new Parse.Query(Score);
		query.descending("pontuacao");
		query.limit(30);
		query.find({
		  success: function(results) {
		  	var table = document.getElementById("azureRanking").tBodies[0];
			if (this.dataTable) {
				this.dataTable.destroy();
			}
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
			this.dataTable = $('#azureRanking').DataTable({lengthChange: false});
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	},

	connected: function () {
		if (this.duplicity) {
			var Conexao = Parse.Object.extend('Conexao');
			var conexao = new Conexao();
			conexao.save({ip: this.ipAddress, country: this.country});
			this.avoidDuplicity();
		}
	},

	ip:  function (json	){
		this.ipAddress = json.ip || this.ip;
		this.country = json.country || this.country;
	},

	bugReport: function (bug) {
		if (this.duplicity) {
			var BugReport = Parse.Object.extend('BugReport');
			var bugReport = new BugReport();
			bugReport.save({bug: bug, country: this.country}).then(function(object) {
				swal("Thanks for your support!", "We will fix the game for you =)", "success");
			});
			this.avoidDuplicity();
		}
	},

	avoidDuplicity: function () {
		this.duplicity = false;
		setTimeout(function () {
			ranking.duplicity = true;
		}, 3000);
	}
};