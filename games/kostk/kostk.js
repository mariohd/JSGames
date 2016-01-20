var kostk = ({
	canvas: null,
  	context: null,
	states: null,
	current_state: null,
	name: "KOTSK",
	
	_create: function () {
		this.canvas = document.getElementById('kostk-canvas');
		this.context = this.canvas.getContext("2d");
		this.states = {
			current: null,
			menu: {id: 1, state: new Menu(this)}, 
		};
		this.states.current = this.states.menu;
	},

	_start: function () {
		this.states.current.state.start();
	},

	_update: function () {
		this.states.current.state.update();
	},
});
Engine.init(kostk);