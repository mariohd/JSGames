class ClickableText {
	constructor(attrs) {
		this.context = attrs.context;
		this.text = attrs.text;
		this.whenClicked = attrs.whenClicked;
		this.height = parseInt(this.context.font) * 1.25,
	 	this.width = parseInt(this.context.measureText(this.text).width);

		this.position = { x: attrs.position.x - (this.width/2), y: attrs.position.y - this.height },

	 	this.clickableArea = new ClickableArea({ 
			width: this.width, height: this.height,
			position: this.position,
			whenClicked: this.whenClicked
		});
	}

	draw() {
		this.context.textAlign = "center";
		this.context.fillText(this.text, this.position.x, this.position.y);
	};

	click() {
		this.clickableArea.click();
	}
}