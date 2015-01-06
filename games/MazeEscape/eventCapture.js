var mediaElement = document.getElementById("song");
document.getElementById("mazeEscapeCanvas").focus();
document.getElementById("mazeEscapeCanvas").onkeypress = function (key) {
	if (key.which == 122){
		if (mediaElement.paused)
			mediaElement.play();
		else
			mediaElement.pause();
	}
	MazeEscape.playerMoviment(key) ;
};

document.getElementById("mazeEscapeCanvas").onkeydown = function (key) {
	MazeEscape.player.walking = true;
};

document.getElementById("mazeEscapeCanvas").onkeyup = function (key) {
	MazeEscape.player.walking = false;
};
