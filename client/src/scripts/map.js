console.log('hey');
	var gui = new Gui($(".map-container"), $("#rightbar"), $("#leftBar"), $("#bottomBar"));
	var canvas, ctx, render;
	$(document).ready(function() {
		
		canvas = document.getElementById('viewport');
		ctx = canvas.getContext('2d');
		
		var img = "TileMaps/16kmd1.b.bmp";
		base_image = new Image();
		base_image.src = img;
		base_image.onload = function(){
			ctx.drawImage(base_image, 0, 0);
			map.img = base_image;
			map.height = base_image.height;
			map.width = base_image.width;
		}
		
		var canvasOffset=$("#viewport").offset();
		var offsetX=canvasOffset.left;
		var offsetY=canvasOffset.top;
		var canvasWidth=canvas.width;
		var canvasHeight=canvas.height;
		var isDragging=false;
		var canMouseX = 0;
		var canMouseX = 0;
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		gui.init();
		
		function handleMouseDown(e){
			
			canMouseX=parseInt(e.clientX-offsetX);
			canMouseY=parseInt(e.clientY-offsetY);
			mouseOnImageOffsetX = canMouseX - map.x;
			mouseOnImageOffsetY = canMouseY - map.y;
			
			// set the drag flag
			isDragging=true;
			canvas.style.cursor = "move";
			event.preventDefault();
		}
		
		function handleMouseUp(e){
			canvas.style.cursor = "";
			canMouseX=parseInt(e.clientX-offsetX);
			canMouseY=parseInt(e.clientY-offsetY);
			// clear the drag flag
			isDragging=false;
		}
		
		function handleMouseOut(e) {
			canvas.style.cursor = "";
			// user has left the canvas, so clear the drag flag
			isDragging=false;
		}
		
		function handleMouseMove(e) {
			// if the drag flag is set, clear the canvas and draw the image
			if(isDragging){
				canMouseX=parseInt(e.clientX-offsetX);
				canMouseY=parseInt(e.clientY-offsetY);
				//console.log(canMouseX, canMouseY)
				render();
			}
			event.preventDefault();
		}
		render = function render () {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			map.x = canMouseX - mouseOnImageOffsetX;
			map.y = canMouseY - mouseOnImageOffsetY;
			
			ctx.drawImage(base_image, map.x, map.y);
		};
		
		var map = {
			height: 0,
			width: 0,
			x: 0,
			y: 0,
			img: null
		}
		
		$("#viewport").mousedown(function(e){handleMouseDown(e);}.bind(this));
		$("#viewport").mousemove(function(e){handleMouseMove(e);}.bind(this));
		$("#viewport").mouseup(function(e){handleMouseUp(e);}.bind(this));
		$("#viewport").mouseout(function(e){handleMouseOut(e);}.bind(this));	
	});