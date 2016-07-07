class ClickableArea {
	constructor(attrs) {
		this.width = attrs.width;
		this.height= attrs.height;
		this.position = attrs.position;
		this.whenClicked = attrs.whenClicked;
	}

	get widthEnd() {
		return this.position.x + this.width;
	}

	get heightEnd() {
		return this.position.y + this.height;
	}

	click() {
		return this.whenClicked();
	}

	draw(context) {
		context.strokeStyle = 'yellow';
		context.strokeRect(this.position.x, this.position.y, this.width, this.height);
	};
}