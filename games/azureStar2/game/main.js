(function () {
	document.addEventListener("DOMContentLoaded", () => { 
		let canvas = document.getElementById('game-canvas'),
			context = canvas.getContext('2d'),
			audios;

		let loadAudios = function (callback = () => 0) {
			audios = {
				menu: 'era_of_space.mp3'
			};
				
			for (var i in audios) {
				let audio = new Audio();
				audio.src = 'audio/' + audios[i];
				audio.addEventListener('loadeddata', callback, false);
				audio.load();
				
				audios[i] = audio;
			}

			return audios;
		};

		let menu = function () {
			setTimeout(() => {
				audios.menu.play();
				context.save();
				context.font="35px Guardians";
				context.textAlign="center";
				context.shadowColor = 'black';
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.shadowBlur = 3;
				let text = "Azure Star 2", 
					alpha = 0,
					grd = context.createLinearGradient(0, 0, parseInt(context.measureText(text).width), 0);
				grd.addColorStop(0, "#9c6d3f");
				grd.addColorStop(1, "#e5db9d");
				grd.addColorStop(.4, "#c69762");
				context.fillStyle = grd;
				(function loop() {
					context.globalAlpha = alpha+= .02;
					context.clearRect(0, 0, canvas.width, canvas.height/3);
					context.fillText(text, canvas.width/2, canvas.height/4);
					if (alpha <= 1) requestAnimationFrame(loop);
					else { context.restore(); audios.menu.play(); }

				})();
			}, 500);
		};

		(() => {
			loadAudios();
			menu();
		})();
	});


})()

