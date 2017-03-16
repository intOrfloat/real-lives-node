var canvas, ctx, render;

var canvasOffset=0;

var offsetX=0;
var offsetY=0;
var canvasWidth=0;
var canvasHeight=0;
var isDragging=false;
var canMouseX = 0;
var canMouseY = 0;
var mouseOnImageOffsetX = 0;
var mouseOnImageOffsetY = 0;
var img = "";

function mapinit() {
	canvas = document.getElementById('viewport');
	canvasOffset=$("#viewport").offset();
	ctx = canvas.getContext('2d');
	offsetX=canvasOffset.left;
	offsetY=canvasOffset.top;
	canvasWidth=canvas.width;
	canvasHeight=canvas.height;
	img = "TileMaps/16kmd1.b.bmp";
	base_image = new Image();
	base_image.src = img;
	base_image.onload = function(){
		ctx.drawImage(base_image, 0, 0);
		map.img = base_image;
		map.height = base_image.height;
		map.width = base_image.width;
	}
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

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
	$(".diary textarea").text(e.clientX + " " + e.clientY + " is dragging " + isDragging);
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