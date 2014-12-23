var MazeEscape = ({
	context: null,
	canvas: null,
	player: null,
	maze: null,
	walls: [],
	forbidenPos: [],
	screenWidths: [],
	timer: null,
	running: true,


	init: function () {
		this.timer = new ClockCounter();
		this.startTimer();
		this.canvas = document.getElementById("mazeEscapeCanvas");
		this.context = this.canvas.getContext("2d");
		this.player = new Player();
		this.startRefreshScreen();
		this.player.walkSprites();
		this.maze = display(maze(8,20));
		this.buildWalls();
		this.screenWidths = [0, this.canvas.width/3, this.canvas.width * 2/3 ];
		return this;
	},

	startTimer: function () {
		this.timer.startCronometer();
		var idTimer = setInterval(function () {
			if (MazeEscape.running){
				MazeEscape.timer.startCronometer();
			} else {
				clearInterval(idTimer);
			}
		}, 1000)
	},

	buildWalls: function() {
		var mazeLines = this.maze.split('\n');
		var distance = 0;
		var height = 0;
		for (var index in mazeLines) {
			var line = mazeLines[index];
			for (var i = 0; i <= line.length; i++) {
				if (line[i] === '+' || line[i] === '-' || line[i] === '|'){
					var wall = new Wall(distance, height);
					this.walls.push(wall);
					this.forbidenPos.push({'maxWidth': distance + 25, 'maxHeight': height + 25, 'minWidth': distance - 25, 'minHeight': height - 25}) ;
				}
				distance += 45;
			}
			height += 40;
			distance = 0;
		}
	},

	startRefreshScreen: function() {
		setInterval(function () {
			MazeEscape.context.beginPath();
			MazeEscape.context.clearRect(0 ,0, MazeEscape.canvas.width, MazeEscape.canvas.height );
			MazeEscape.drawMaze();
			MazeEscape.player.draw(MazeEscape.context, MazeEscape.canvas);
		}, 15);
	},

	drawMaze: function () {
		this.context.save();
		for(var index in this.walls){
			this.walls[index].build(this.context);
		}
	},

	playerMoviment: function (key) {
			if (this.player.position.height > -1){
				switch(key.charCode) {
					case 'a'.charCodeAt(0):
						this.player.direction = Direction.LEFT;
						var can = MazeEscape.forbidenPos.filter(function (value) {
							if (MazeEscape.player.position.width - 28 > value.minWidth && MazeEscape.player.position.width - 28 < value.maxWidth)
								if (MazeEscape.player.position.height > value.minHeight && MazeEscape.player.position.height < value.maxHeight)
									return true;
						}).length > 0;
						if (!can) {
							this.player.walk();
						}
						break;

					case 's'.charCodeAt(0):
						this.player.direction = Direction.FRONT;
						var can = MazeEscape.forbidenPos.filter(function (value) {
							if (MazeEscape.player.position.width > value.minWidth && MazeEscape.player.position.width < value.maxWidth)
								if (MazeEscape.player.position.height + 30 > value.minHeight && MazeEscape.player.position.height + 30 < value.maxHeight)
									return true;
								}).length > 0;
								if (!can) {
									this.player.walk();
								}
						break;

					case 'd'.charCodeAt(0):
						this.player.direction = Direction.RIGHT;
						var can = MazeEscape.forbidenPos.filter(function (value) {
							if (MazeEscape.player.position.width + 14 > value.minWidth && MazeEscape.player.position.width + 14 < value.maxWidth)
								if (MazeEscape.player.position.height > value.minHeight && MazeEscape.player.position.height < value.maxHeight)
									return true;
								}).length > 0;
								if (!can) {
									this.player.walk();
								}
						break;

					case 'w'.charCodeAt(0):
						this.player.direction = Direction.BACK;
						var can = MazeEscape.forbidenPos.filter(function (value) {
							if (MazeEscape.player.position.width > value.minWidth && MazeEscape.player.position.width  < value.maxWidth)
								if (MazeEscape.player.position.height - 7 > value.minHeight && MazeEscape.player.position.height - 7 < value.maxHeight)
									return true;
								}).length > 0;
								if (!can) {
									this.player.walk();
								}
						break;
			}
		} else {
			this.player.position.height = 0;
		}

		if (this.player.position.width < this.screenWidths[1] ) {
			this.smoothScroll(this.screenWidths[0]);
		}

		if (this.player.position.width > this.screenWidths[1] &&
				this.player.position.width < this.screenWidths[2]) {
			this.smoothScroll(this.screenWidths[1]);
		}

		if (this.player.position.width > this.screenWidths[2]) {
			this.smoothScroll(this.screenWidths[2]);
		}

		if (this.player.position.width > 3655 ) {
			this.running = false;
			this.showResultMessage('Congrats!\nYour time is\n' + this.timer.timeCrono , 'victory');
		}

	},

	showResultMessage: function (message, className) {
		var result = document.getElementById('result')
		result.innerText = message;
		result.classList.add(className);
	},

	smoothScroll: function (place) {
		var x = parseInt(document.body.scrollLeft);
		var placeInt = parseInt(place);
		if (placeInt % 2 > 0 ) {
			placeInt += 1;
		}
		if (x % 2 > 0 ){
			x += 1;
		}
		var intervalId = setInterval(function () {
			if (x == placeInt) {
			  clearInterval(intervalId);
			} else {
				if (placeInt > x ){
					x += 2;
				} else {
					x -= 2;
				}
				window.scrollTo(x, 0);
			}
		});
	}
}).init();