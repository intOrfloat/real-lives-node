function Gui (mapContainer, rightBar, leftBar, bottomBar, render) {
	this.mapContainer = mapContainer;
	this.rightBar = rightBar;
	this.leftBar = leftBar;
	this.bottomBar = bottomBar;
	this.render = render;
}

Gui.prototype.init = function init () {
	mapinit();
	this.mapContainer.resizable({
		resize: function (e, ui) {
			
			changeElementSizingToPercents(ui.element);

			var mapPercentWidth = ui.element[0].style['width'].slice(0, -1)
			
			var rightPercentWidth = this.rightBar[0].style['width'].slice(0, -1);
			var leftPercentWidth = this.leftBar[0].style['width'].slice(0, -1);
			var difference = 100 - mapPercentWidth - rightPercentWidth - leftPercentWidth;
			if(rightPercentWidth < 5)
			{
				 this.mapContainer.resizable("option", "maxWidth", ui.size.width); 
			}

			this.rightBar.css("width", parseFloat(rightPercentWidth) + parseFloat(difference) + "%");
			
			var mapPercentHeight = parseFloat(ui.element[0].style['height'].slice(0, -1));
			var topbarPercentHeight = parseFloat( $("#topbar")[0].style['height'].slice(0, -1) );
			var bottombarPercentHeight = parseFloat( this.bottomBar[0].style['height'].slice(0, -1) );
			var difference = 100 - mapPercentHeight - topbarPercentHeight - bottombarPercentHeight;
			if(bottombarPercentHeight < 5)
			{
				 this.mapContainer.resizable("option", "maxHeight", ui.size.height); 
			}

			this.bottomBar.css("height", bottombarPercentHeight + difference + "%");

			this.rightBar.css("height", mapPercentHeight +"%");
			this.leftBar.css("height", mapPercentHeight + "%");
			this.render();

		}.bind(this),
		stop: function(e, ui) {
			changeElementSizingToPercents(ui.element);
			var mapPercentWidth = ui.element[0].style['width'].slice(0, -1)
			
			var rightPercentWidth = this.rightBar[0].style['width'].slice(0, -1);
			var leftPercentWidth = this.leftBar[0].style['width'].slice(0, -1);
			var difference = 100 - mapPercentWidth - rightPercentWidth - leftPercentWidth;
			if(difference < 0)
				this.rightBar.css("width", parseFloat(rightPercentWidth) + parseFloat(difference) + "%")
			this.mapContainer.resizable("option", "maxWidth", null);
			this.mapContainer.resizable("option", "maxHeight", null); 
			
		}.bind(this)
	});
	this.leftBar.resizable({
		resize: function (e, ui) {
			changeElementSizingToPercents(ui.element);
			var leftPercentWidth = ui.element[0].style['width'].slice(0, -1)
			
			var rightPercentWidth = this.rightBar[0].style['width'].slice(0, -1);
			var mapPercentWidth = this.mapContainer[0].style['width'].slice(0, -1);
			var difference = 100 - parseFloat(mapPercentWidth) - parseFloat(rightPercentWidth) - parseFloat(leftPercentWidth);
			if(mapPercentWidth < 5)
			{
				 this.leftBar.resizable("option", "maxWidth", ui.size.width); 
			}

			this.mapContainer.css("width", parseFloat(mapPercentWidth) + parseFloat(difference) + "%")

			var leftPercentHeight = parseFloat(ui.element[0].style['height'].slice(0, -1));
			var topbarPercentHeight = parseFloat( $("#topbar")[0].style['height'].slice(0, -1) );
			var bottombarPercentHeight = parseFloat( this.bottomBar[0].style['height'].slice(0, -1) );
			var difference = 100 - leftPercentHeight - topbarPercentHeight - bottombarPercentHeight;
			if(bottombarPercentHeight < 5)
			{
				 this.leftBar.resizable("option", "maxHeight", ui.size.height); 
			}

			this.bottomBar.css("height", bottombarPercentHeight + difference + "%");

			this.rightBar.css("height", leftPercentHeight +"%");
			this.mapContainer.css("height", leftPercentHeight + "%");
			this.render();
		}.bind(this),
		stop: function(e, ui) {
			changeElementSizingToPercents(ui.element);
			var leftPercentWidth = ui.element[0].style['width'].slice(0, -1);
			
			var rightPercentWidth = this.rightBar[0].style['width'].slice(0, -1);
			var mapPercentWidth = this.mapContainer[0].style['width'].slice(0, -1);
			var difference = 100 - mapPercentWidth - rightPercentWidth - leftPercentWidth;
			if(difference < 0)
				this.rightBar.css("width", parseFloat(rightPercentWidth) + parseFloat(difference) + "%")
			this.leftBar.resizable("option", "maxWidth", null);
			this.leftBar.resizable("option", "maxHeight", null); 
		}.bind(this)
	});

	function changeElementSizingToPercents(element){
		var parent = element.parent();
			element.css({
				width: element.width()/parent.width()*100+"%",
				height: element.height()/parent.height()*100+"%"
		});
	}

	
};
