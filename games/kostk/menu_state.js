function Menu(game) {
	this.game = game;

	this.defaults = {
		font: {
			color: '#af111c',
			family: "SomethingStrange",
			size: "70px 'Metal Mania', cursive"
		},
		alpha: 1
	};

	this.animations = {
		name: {
			label: this.game.name,
			location: {
				start: { x: this.game.canvas.width/2, y: -20},
				end: { x: this.game.canvas.width/2, y: this.game.canvas.height/3 },
				current: { x: this.game.canvas.width/2, y: -20}
			},
			font: {
				size: "170px " + this.defaults.font.family,
				color: '#af111c',

			}
		},
		options: {
			start: {
				label: "Start",
				location: {
					current: { x: this.game.canvas.width/2, y: parseInt(this.game.canvas.height/1.50) }
				},
				alpha: 0
			},
			load: {
				label: "Load",
				location: {
					current: { x: this.game.canvas.width/2, y: parseInt(this.game.canvas.height/1.25) }
				},
				alpha: 0
			}
		}
	};
};

Menu.prototype = {

	start: function () {
		this.update();
	},

	update: function () {
		var i = new Image();
		i.src = "background_menu.jpg";
		this.game.context.drawImage(i, 0, 0, this.game.canvas.width, this.game.canvas.height);
		if (this.animations.name.location.end.y >= this.animations.name.location.current.y) {
			this.animations.name.location.current.y += 1;
			this._drawText(this.animations.name.label, this.animations.name.location.current, { font: this.animations.name.font });
		} else {
			this._drawText(this.animations.name.label, this.animations.name.location.current, {font: this.animations.name.font });
			this._drawText(this.animations.options.start.label, this.animations.options.start.location.current, { alpha: this.animations.options.start.alpha += .01 });
			this._drawText(this.animations.options.load.label, this.animations.options.load.location.current, {alpha: this.animations.options.load.alpha += .01 });
		}
	},

	_drawText: function (text, location, options) {
		options = extend(this.defaults, options);
		this.game.context.font = options.font.size;
		this.game.context.fillStyle = options.font.color;
		this.game.context.globalAlpha = options.alpha;
		this.game.context.textAlign = 'center';
		this.game.context.shadowColor = 'black';
		this.game.context.shadowOffsetX = 3;
		this.game.context.shadowOffsetY = 3;
		this.game.context.shadowBlur = 3;
		this.game.context.fillText(text, location.x, location.y);
	}
};