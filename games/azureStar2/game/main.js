(function () {
	document.addEventListener("DOMContentLoaded", () => { 
		let canvas = document.getElementById('game-canvas'),
			context = canvas.getContext('2d'),
			strings = {
				gameName: 'Azure Star 2',
				options: {
					newGame: 'New Game',
					loadGame: 'Continue?'
				}
			},
			styles = {
				guardians: {
					tiny : '15pt Guardians',
					small: '20pt Guardians',
					normal: '25pt Guardians',
					great: '35pt Guardians',
					biggest: '45pt Guardians'
				},
			},
			audios = {
				menu: 'era_of_space.mp3'
			},
			images = {
				oddPlanet: 'planets/oddPlanet.png',
				redPlanet: 'planets/redPlanet.png',
				rockPlanet: 'planets/rockPlanet.png',
				sandPlanet: 'planets/sandPlanet.png',
				waterPlanet: 'planets/waterPlanet.png',
				earth: 'planets/earth.png'
			},
			clickableAreas = [];

		let loadingAsset = function () {
			let loaded = 0,
				loadingBarWidth = canvas.width * .9;

			return () => {
				loaded++;
				let totalLoaded = loaded / (audios.size + images.size),
					loadedBar = totalLoaded * loadingBarWidth;

				if (totalLoaded === 1) {
					context.clearRect((canvas.width - loadingBarWidth)/2, canvas.height * .8, loadedBar, 50);
				} else {
					context.save();
					context.fillStyle = 'rgba(94, 211, 69, 0.5)';
					context.fillRect((canvas.width - loadingBarWidth)/2, canvas.height * .8, loadedBar, 50);
					context.restore();
				}
			};
		}();

		let loadAudios = function (callback = () => {}) {
			let size = 0;
				
			for (let i in audios) {
				let audio = new Audio();
				audio.src = 'audio/' + audios[i];
				callback.bind(audio);
				audio.addEventListener('loadeddata', callback, false);
				audio.load();
				
				audios[i] = audio;
				size++;
			}
			audios.size = size;

			return audios;
		};

		let loadImages = function (callback = () => {}) {
			let size = 0;

			for (let i in images) {
				let img = new Image();
				img.src = 'images/' + images[i];
				callback.bind(img);
				img.onload = callback;

				images[i] = img;
				size++;
			}
			images.size = size;

			return images;
		};

		let menu = function () {
			setTimeout(() => {
				audios.menu.play();
				context.save();
				context.font = styles.guardians.normal;
				context.fillStyle = azureGradient(strings.gameName);
				context.textAlign="center";
				enableShadows();
				let alpha = 0;
				(function loop() {
					context.globalAlpha = alpha += .02;
					context.clearRect(0, 0, canvas.width, canvas.height/4);
					context.fillText(strings.gameName, canvas.width/2, canvas.height/4);
					if (alpha <= 1) requestAnimationFrame(loop);
					else { context.restore(); audios.menu.play(); options();}
				})();
			}, 500);

			let options = function () {
				context.save();
				context.textAlign="center";
				context.font = styles.guardians.small;
				enableShadows();

				context.fillStyle = 'lightgray';
				newGameOption();

				if (localStorage.getItem('as2-savedGame'))
					loadGameOptions();

				context.restore();
			};

			let newGameOption = () => {
				context.fillText(strings.options.newGame, canvas.width * .5, canvas.height * .75);
				let height = parseInt(context.font) * 1.25,
			 		width = parseInt(context.measureText(strings.options.newGame).width);

				let newGameOption = new ClickableArea({ 
					width, height,
					position: { x: canvas.width * .5 - width/2, y: canvas.height * .75 - height },
					whenClicked: () => {
						alert('newGame!!');
					}
				});
				clickableAreas.push(newGameOption);
			};

			let loadGameOptions = () => {
				context.fillText(strings.options.loadGame, canvas.width * .5, canvas.height * .85);
				let height = parseInt(context.font) * 1.25,
			 		width = parseInt(context.measureText(strings.options.loadGame).width);

				let loadGameOption = new ClickableArea({ 
					width, height,
					position: { x: canvas.width * .5 - width/2, y: canvas.height * .85 - height },
					whenClicked: () => {
						alert('LoadGame!!');
					}
				});
				clickableAreas.push(loadGameOption);
			};

			let azureGradient = (text) => {
				let grd = context.createLinearGradient(0, 0, parseInt(context.measureText(text).width), 0);
				grd.addColorStop(0, "#9c6d3f");
				grd.addColorStop(1, "#e5db9d");
				grd.addColorStop(.4, "#c69762");
				return grd;
			};

			let enableShadows = () => {
				context.shadowColor = 'black';
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.shadowBlur = 3;
			}
		};

		let captureClicks = function () {
			canvas.addEventListener('click', function (click) {
				clickableAreas.forEach((area) => {
					if (click.layerX > area.position.x && click.layerX <= area.widthEnd) {
						if (click.layerY > area.position.y && click.layerY <= area.heightEnd) {
							area.click();
							area.draw(context);
						}
					}
				});
			});
		};

		(() => {
			menu();
			captureClicks();
			loadAudios(loadingAsset);
			loadImages(loadingAsset);
		})();
	});


})()

