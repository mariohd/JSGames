document.getElementById("mazeEscapeCanvas").focus();
document.getElementById("mazeEscapeCanvas").onkeypress = function (key) {
	MazeEscape.playerMoviment(key) ;
};

document.getElementById("mazeEscapeCanvas").onkeydown = function (key) {
	MazeEscape.player.walking = true;
};

document.getElementById("mazeEscapeCanvas").onkeyup = function (key) {
	MazeEscape.player.walking = false;
};