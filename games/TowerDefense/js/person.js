function Person () {};

Person.prototype = {
	MOVEMENTS: {
		ATTACKS : {
			MAGIC: {
				BACK: 0, LEFT: 1, FRONT: 2, RIGHT: 3
			},
			SPEAR: {
				BACK: 4, LEFT: 5, FRONT: 6, RIGHT: 7
			},
			SWORD: {
				BACK: 12, LEFT: 13, FRONT: 14, RIGHT: 15
			},
			BOW: {
				BACK: 16, LEFT: 17, FRONT: 18, RIGHT: 19
			}	
		},
		WALK: {
			BACK: 8, LEFT: 9, FRONT: 10, RIGHT: 11
		},
		DEATH: 20
	},

	draw: function () {
		this.sprite.desenhar(this.position, this.escala);
	}

};