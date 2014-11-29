var context = document.getElementById('AsciiCanvas').getContext("2d");
var canvas = document.getElementById('AsciiCanvas');


function writeTextToCanvas(){
	//stuff
}

var bgimage = document.createElement("IMG");
function DrawImageToCanvas(){
	bgimage.src = document.getElementById("textToEnter").value
	bgimage.onload = function(){
		context.drawImage(bgimage, 0, 0, 680, 500);
	};
}

function FindEdges(){
	var img = bgimage.src;
	//     img.addEventListener('load', function() {

	      var canvases = document.getElementsByTagName('AsciiCanvas');
	      for (var i=0; i<canvases.length; i++) {
	        var c = canvases[i];
	        c.parentNode.insertBefore(img.cloneNode(true), c);
	        c.style.display = 'none';
	      }
		  
		  runFilter();

	      function runFilter(id, filter, arg1, arg2, arg3) {
		  	console.log("stuff is happening");
	        var c = document.getElementById(id);
	        //var s = c.previousSibling.style;
	        //var b = c.parentNode.getElementsByTagName('button')[0];
	        // if (b.originalText == null) {
// 	          b.originalText = b.textContent;
// 	        }
	        // if (s.display == 'none') {
// 	          s.display = 'inline';
// 	          c.style.display = 'none';
// 	          b.textContent = b.originalText;
// 	        } else {
	          var idata = Filters.filterImage(filter, img, arg1, arg2, arg3);
	          c.width = idata.width;
	          c.height = idata.height;
	          var ctx = c.getContext('2d');
	          ctx.putImageData(idata, 0, 0);
	          //s.display = 'none';
	          c.style.display = 'inline';
	         // b.textContent = 'Restore original image';
	        //}
	      }

	      grayscale = function() {
	        runFilter('grayscale', Filters.grayscale);
	      }

	      brightness = function() {
	        runFilter('brightness', Filters.brightness, 40);
	      }

	      threshold = function() {
	        runFilter('threshold', Filters.threshold, 128);
	      }

	      sharpen = function() {
	        runFilter('sharpen', Filters.convolute,
	          [ 0, -1,  0,
	           -1,  5, -1,
	            0, -1,  0]);
	      }

	      blurC = function() {
	        runFilter('blurC', Filters.convolute,
	          [ 1/9, 1/9, 1/9,
	            1/9, 1/9, 1/9,
	            1/9, 1/9, 1/9 ]);
	      }

	      sobel = function() {
	        runFilter('sobel', function(px) {
	          px = Filters.grayscale(px);
	          var vertical = Filters.convoluteFloat32(px,
	            [-1,-2,-1,
	              0, 0, 0,
	              1, 2, 1]);
	          var horizontal = Filters.convoluteFloat32(px,
	            [-1,0,1,
	             -2,0,2,
	             -1,0,1]);
	          var id = Filters.createImageData(vertical.width, vertical.height);
	          for (var i=0; i<id.data.length; i+=4) {
	            var v = Math.abs(vertical.data[i]);
	            id.data[i] = v;
	            var h = Math.abs(horizontal.data[i]);
	            id.data[i+1] = h
	            id.data[i+2] = (v+h)/4;
	            id.data[i+3] = 255;
	          }
	          return id;
	        });
	      }
}

function clearCanvas(){
	ctxMainCanvas.clearRect(0, 0, 680, 500);
	return false;
}