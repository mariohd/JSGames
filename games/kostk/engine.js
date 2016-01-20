var Engine = ({
	game: null,
	states: {
		halt: 0,
		menu: 1,
		started: 2,
		paused: 3,
		over: 4,
		end: 5,
		current: 1,
	},

	init: function (game) {
		this.game = game;
		this.game._create();
		this.start();
	},

	start: function () {
		if (typeof this.game._beforeStart == "function") {
			this.game._beforeStart();
		}
		this.game._start();

		this._refresh();
	},

	_refresh: function () {
		var engine = this;
		requestAnimationFrame(function() {
			if (engine.states.current != engine.states.halt) {
				engine._clear();
				engine.game._update();
			}
			engine._refresh();
		});
	},

	_clear: function () {
		this.game.context.clearRect(0 ,0, this.game.canvas.width, this.game.canvas.height );
	},
});