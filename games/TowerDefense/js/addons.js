"use strict"
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];

HTMLElement.prototype.removeClass = function(remove) {
    let newClassName = "";
    let i;
    let classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== remove) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName.trim();
}

if ( ! window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

				window.setTimeout( callback, 1000 / 60 );

			};

	} )();
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/**
* Generates a matrix (ie: 2-D Array) with: 
* 'n' rows, 
* 'm' columns, 
*/
function Matrix(n, m){
    return Array.apply(null, new Array(n)).map(function () { 
      return new Array(m);
    });
}

Object.defineProperty(Array.prototype, 'clean', {
  enumerable: false,
  value: function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {         
        this.splice(i, 1);
        i--;
      }
    }
    return this;
  }
});