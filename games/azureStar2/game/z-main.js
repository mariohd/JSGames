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
				menu: 'menu.mp3'
			},
			images = {
				stageSelect: 'stageSelect.jpg',
				oddPlanet: 'planets/oddPlanet.png',
				redPlanet: 'planets/redPlanet.png',
				rockPlanet: 'planets/rockPlanet.png',
				cloudPlanet: 'planets/cloudPlanet.png',
				waterPlanet: 'planets/waterPlanet.png',
				earth: 'planets/earth.png',
				saturn: 'planets/saturn.png'
			},
			planets = [],
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
					init();
					menu();
					captureClicks();
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
				audios.menu.addEventListener('timeupdate', function(){
                var buffer = .05;
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0
                    this.play()
                }}, false);
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

				if (localStorage.getItem('as2-savedGame') || true)
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
						clickableAreas = [];
						showPlanets();
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

		let init = function() {
			let waterPlanet = new Planet({
				context,
				name: "Water Planet",
				level: 1,
				image: images.waterPlanet,
				position: {x: 70, y: 500},
				size: {width: 95, height: 95}
			});

			let oddPlanet = new Planet({
				context,
				name: "Odd Planet",
				level: 2,
				image: images.oddPlanet,
				position: {x: 100, y: 180},
				size: {width: 110, height: 110}
			});
			
			waterPlanet.next(oddPlanet);
			planets.push(waterPlanet);
			planets.push(oddPlanet);
		}

		let showPlanets = function () {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(images.stageSelect, 0, 0);
			planets.forEach((p) => {
				p.draw();
				clickableAreas.push(p);
			});
		};

		let drawPlanet1 = function () {
			context.save();
			context.beginPath();
			context.lineWidth = 4;
			context.strokeStyle = 'white';
			context.moveTo(70 + 95/2, 500 + 95/2);
			context.lineTo(100 + 110/2, 180 + 110/2);
			context.stroke();
			context.restore();
			context.drawImage(images.waterPlanet, 70, 500, 95, 95);
		};

		let drawPlanet2 = function () {
			context.save();
			context.beginPath();
			context.lineWidth = 4;
			context.strokeStyle = 'white';
			context.moveTo(100 + 110/2, 180 + 110/2);
			context.lineTo(360 + 150/2, 160 + 69/2);
			context.stroke();
			context.restore();
			context.drawImage(images.oddPlanet, 100, 180, 110, 110);
			drawPlanet3();
		};

		let drawPlanet3 = function () {
			context.drawImage(images.saturn, 360, 160, 150, 69);
						drawPlanet4();

		};

		let drawPlanet4 = function () {
			context.drawImage(images.redPlanet, 410, 380, 120, 120);
						drawPlanet5();

		};

		let drawPlanet5 = function () {
			context.drawImage(images.cloudPlanet, 580, 530, 120, 120);
						drawPlanet6();
 
		};
 
		let drawPlanet6 = function () {
			context.drawImage(images.earth, 700, 330, 120, 120);
		};

		let captureClicks = function () {
			canvas.addEventListener('click', function (click) {
				clickableAreas.forEach((area) => {
					if (click.layerX > area.position.x && click.layerX <= area.widthEnd) {
						if (click.layerY > area.position.y && click.layerY <= area.heightEnd) {
							area.click();
						}
					}
				});
			});
		};

		(() => {
			loadAudios(loadingAsset);
			loadImages(loadingAsset);
		})();
	});


})()

