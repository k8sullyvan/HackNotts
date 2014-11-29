var context = document.getElementById('AsciiCanvas').getContext("2d");
var canvas = document.getElementById('AsciiCanvas');


function writeTextToCanvas(){
	//stuff
}

function DrawImageToCanvas(){
	var bgimage = document.createElement("IMG");
	bgimage.src = document.getElementById("textToEnter").innerHTML
	bgimage.onload = function(){
		context.drawImage(bgimage, 0, 0, 680, 500);
	};
}

function clearCanvas(){
	ctxMainCanvas.clearRect(0, 0, 680, 500);
	return false;
}