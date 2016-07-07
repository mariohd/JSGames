'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClickableArea = function () {
	function ClickableArea(attrs) {
		_classCallCheck(this, ClickableArea);

		this.width = attrs.width;
		this.height = attrs.height;
		this.position = attrs.position;
		this.whenClicked = attrs.whenClicked;
	}

	_createClass(ClickableArea, [{
		key: 'click',
		value: function click() {
			return this.whenClicked();
		}
	}, {
		key: 'draw',
		value: function draw(context) {
			context.strokeStyle = 'yellow';
			context.strokeRect(this.position.x, this.position.y, this.width, this.height);
		}
	}, {
		key: 'widthEnd',
		get: function get() {
			return this.position.x + this.width;
		}
	}, {
		key: 'heightEnd',
		get: function get() {
			return this.position.y + this.height;
		}
	}]);

	return ClickableArea;
}();
'use strict';

(function () {
	document.addEventListener("DOMContentLoaded", function () {
		var canvas = document.getElementById('game-canvas'),
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
				tiny: '15pt Guardians',
				small: '20pt Guardians',
				normal: '25pt Guardians',
				great: '35pt Guardians',
				biggest: '45pt Guardians'
			}
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

		var loadingAsset = function () {
			var loaded = 0,
			    loadingBarWidth = canvas.width * .9;

			return function () {
				loaded++;
				var totalLoaded = loaded / (audios.size + images.size),
				    loadedBar = totalLoaded * loadingBarWidth;

				if (totalLoaded === 1) {
					context.clearRect((canvas.width - loadingBarWidth) / 2, canvas.height * .8, loadedBar, 50);
				} else {
					context.save();
					context.fillStyle = 'rgba(94, 211, 69, 0.5)';
					context.fillRect((canvas.width - loadingBarWidth) / 2, canvas.height * .8, loadedBar, 50);
					context.restore();
				}
			};
		}();

		var loadAudios = function loadAudios() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

			var size = 0;

			for (var i in audios) {
				var audio = new Audio();
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

		var loadImages = function loadImages() {
			var callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];

			var size = 0;

			for (var i in images) {
				var img = new Image();
				img.src = 'images/' + images[i];
				callback.bind(img);
				img.onload = callback;

				images[i] = img;
				size++;
			}
			images.size = size;

			return images;
		};

		var menu = function menu() {
			setTimeout(function () {
				audios.menu.play();
				context.save();
				context.font = styles.guardians.normal;
				context.fillStyle = azureGradient(strings.gameName);
				context.textAlign = "center";
				enableShadows();
				var alpha = 0;
				(function loop() {
					context.globalAlpha = alpha += .02;
					context.clearRect(0, 0, canvas.width, canvas.height / 4);
					context.fillText(strings.gameName, canvas.width / 2, canvas.height / 4);
					if (alpha <= 1) requestAnimationFrame(loop);else {
						context.restore();audios.menu.play();options();
					}
				})();
			}, 500);

			var options = function options() {
				context.save();
				context.textAlign = "center";
				context.font = styles.guardians.small;
				enableShadows();

				context.fillStyle = 'lightgray';
				newGameOption();

				if (localStorage.getItem('as2-savedGame')) loadGameOptions();

				context.restore();
			};

			var newGameOption = function newGameOption() {
				context.fillText(strings.options.newGame, canvas.width * .5, canvas.height * .75);
				var height = parseInt(context.font) * 1.25,
				    width = parseInt(context.measureText(strings.options.newGame).width);

				var newGameOption = new ClickableArea({
					width: width, height: height,
					position: { x: canvas.width * .5 - width / 2, y: canvas.height * .75 - height },
					whenClicked: function whenClicked() {
						alert('newGame!!');
					}
				});
				clickableAreas.push(newGameOption);
			};

			var loadGameOptions = function loadGameOptions() {
				context.fillText(strings.options.loadGame, canvas.width * .5, canvas.height * .85);
				var height = parseInt(context.font) * 1.25,
				    width = parseInt(context.measureText(strings.options.loadGame).width);

				var loadGameOption = new ClickableArea({
					width: width, height: height,
					position: { x: canvas.width * .5 - width / 2, y: canvas.height * .85 - height },
					whenClicked: function whenClicked() {
						alert('LoadGame!!');
					}
				});
				clickableAreas.push(loadGameOption);
			};

			var azureGradient = function azureGradient(text) {
				var grd = context.createLinearGradient(0, 0, parseInt(context.measureText(text).width), 0);
				grd.addColorStop(0, "#9c6d3f");
				grd.addColorStop(1, "#e5db9d");
				grd.addColorStop(.4, "#c69762");
				return grd;
			};

			var enableShadows = function enableShadows() {
				context.shadowColor = 'black';
				context.shadowOffsetX = 5;
				context.shadowOffsetY = 5;
				context.shadowBlur = 3;
			};
		};

		var captureClicks = function captureClicks() {
			canvas.addEventListener('click', function (click) {
				clickableAreas.forEach(function (area) {
					if (click.layerX > area.position.x && click.layerX <= area.widthEnd) {
						if (click.layerY > area.position.y && click.layerY <= area.heightEnd) {
							area.click();
							area.draw(context);
						}
					}
				});
			});
		};

		(function () {
			menu();
			captureClicks();
			loadAudios(loadingAsset);
			loadImages(loadingAsset);
		})();
	});
})();
