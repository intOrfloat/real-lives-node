function Map() {
	this.canvas, this.ctx, this.render;
	this.canvasOffset=0;
	this.offsetX=0;
	this.offsetY=0;
	this.canvasWidth=0;
	this.canvasHeight=0;
	this.isDragging=false;
	this.canMouseX = 0;
	this.canMouseY = 0;
	this.mouseOnImageOffsetX = 0;
	this.mouseOnImageOffsetY = 0;
	this.img = "";
	this.map = {
		height: 0,
		width: 0,
		x: 0,
		y: 0,
		img: null
	};
  this.mapchunks={};
}

Map.prototype.init = function init() {
	this.canvas = document.getElementById('viewport');
	this.canvasOffset=$("#viewport").offset();
	this.ctx = this.canvas.getContext('2d');
	this.offsetX=this.canvasOffset.left;
	this.offsetY=this.canvasOffset.top;
	this.canvasWidth=this.canvas.width;
	this.canvasHeight=this.canvas.height;
	this.img = "TileMaps/16kmd1.b.bmp";
	this.base_image = new Image();
	this.base_image.src = this.img;
	this.base_image.onload = function(){
		//this.ctx.drawImage(this.base_image, 0, 0);
		this.map.img = this.base_image;
		this.map.height = this.base_image.height;
		this.map.width = this.base_image.width;
		this.render();
	}.bind(this);
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
	$("#viewport").bind('touchstart mousedown', function(e) {
		e.preventDefault();
		
		e.clientX = (typeof e.clientX === 'number') ? e.clientX : e.originalEvent.changedTouches[0].clientX;
		e.clientY = (typeof e.clientY === 'number') ? e.clientY : e.originalEvent.changedTouches[0].clientY;
		this.handleMouseDown(e);
	}.bind(this));
	$("#viewport").bind('touchmove mousemove', function(e) {
		
		e.preventDefault();
		
		e.clientX = (typeof e.clientX === 'number') ? e.clientX : e.originalEvent.changedTouches[0].clientX;
		
		e.clientY = (typeof e.clientY === 'number') ? e.clientY : e.originalEvent.changedTouches[0].clientY;
		
		this.handleMouseMove(e);
		
	}.bind(this));
	$("#viewport").bind('touchend mouseup', function(e) {
		e.preventDefault();
		e.clientX = (typeof e.clientX === 'number') ? e.clientX : e.originalEvent.changedTouches[0].clientX;
		e.clientY = (typeof e.clientY === 'number') ? e.clientY : e.originalEvent.changedTouches[0].clientY;
		this.handleMouseUp(e);
	}.bind(this));
	$("#viewport").bind('touchcancel mouseout', function(e) {
		e.preventDefault();
		e.clientX = (typeof e.clientX === 'number') ? e.clientX : e.originalEvent.changedTouches[0].clientX;
		e.clientY = (typeof e.clientY === 'number') ? e.clientY : e.originalEvent.changedTouches[0].clientY;
		this.handleMouseOut(e);
	}.bind(this));
};

Map.prototype.handleMouseDown = function handleMouseDown(e) {
	
	this.canMouseX=parseInt(e.clientX-this.offsetX);
	this.canMouseY=parseInt(e.clientY-this.offsetY);
	this.mouseOnImageOffsetX = this.canMouseX - this.map.x;
	this.mouseOnImageOffsetY = this.canMouseY - this.map.y;
	
	// set the drag flag
	this.isDragging=true;
	this.canvas.style.cursor = "move";
	event.preventDefault();
}

Map.prototype.handleMouseUp = function handleMouseUp(e){
	this.canvas.style.cursor = "";
	this.canMouseX=parseInt(e.clientX-this.offsetX);
	this.canMouseY=parseInt(e.clientY-this.offsetY);
	// clear the drag flag
	this.isDragging=false;
}

Map.prototype.handleMouseOut = function handleMouseOut(e) {
	this.canvas.style.cursor = "";
	// user has left the canvas, so clear the drag flag
	this.isDragging=false;
}

Map.prototype.handleMouseMove = function handleMouseMove(e) {
	// if the drag flag is set, clear the canvas and draw the image
	//$(".diary textarea").text(e.clientX + " " + e.clientY + " is dragging " + isDragging);
	
	if(this.isDragging){
		this.canMouseX=parseInt(e.clientX-this.offsetX);
		this.canMouseY=parseInt(e.clientY-this.offsetY);
		//console.log(canMouseX, canMouseY)
      window.requestAnimationFrame(this.render.bind(this));
		//this.render();
	}
	event.preventDefault();
}
Map.prototype.render = function render () {
	this.canvas.width = this.canvas.offsetWidth;
	this.canvas.height = this.canvas.offsetHeight;
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.map.x = this.canMouseX - this.mouseOnImageOffsetX;
	this.map.y = this.canMouseY - this.mouseOnImageOffsetY;
	
	this.ctx.drawImage(this.base_image, this.map.x, this.map.y);
	this.ctx.drawImage(this.base_image, this.map.x + this.base_image.width, this.map.y);
	var text = "map x:" + this.map.x + " map y:" + this.map.y + " images over:" + this.map.x % this.base_image.width;
	this.ctx.fillText(text,10,50);
};

Map.prototype.isInsideArea = function isInsideArea (x, y, box) {
  var maxX = Math.max(box.x1, box.x2);
  var maxY = Math.max(box.y1, box.y2);
  var minX = Math.min(box.x1, box.x2);
  var minY = Math.min(box.y1, box.y2);
  
	return (x >= box.x1) && (x <= box.x2) && (y >= box.y1) && (y <= box.y2);
};