class Planet {
	constructor(attrs) {
		this.context = attrs.context;
		this.name = attrs.name;
		this.level = attrs.level;
		this.image = attrs.image;
		this.position = attrs.position;
		this.size = attrs.size;
	}

	get widthEnd() {
		return this.position.x + this.size.width;
	}

	get heightEnd() {
		return this.position.y + this.size.height;
	}

	get clickableArea() {
		return new ClickableArea({
			width: this.size.width, height: this.size.height, position: this.position,
			whenClicked: click
		});
	}

	next(n) {
		this.nextPlanet = n;
	}

	click() {
		console.log("Clicou no planeta ", this.name);
	}

	draw() {
		if (this.nextPlanet) { this.complete(); }
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
	}

	complete() {
		this.context.save();
		this.context.beginPath();
		this.context.lineWidth = 4;
		this.context.strokeStyle = 'white';
		this.context.moveTo(this.position.x + this.size.width/2, this.position.y + this.size.height/2);
		this.context.lineTo(this.nextPlanet.position.x + this.nextPlanet.size.width/2, this.nextPlanet.position.y + this.nextPlanet.size.height/2);
		this.context.stroke();
		this.context.restore();
	}
}