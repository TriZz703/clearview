$(function() {

	var $slider = $("#photo-slider"),
		$wrapper = $("#photo-slider-wrapper"),
		currentDelta = 0,
		slideData = [],
		gatherSlideData = function () {
			$slider.find('a').each(function(){
				var $this = $(this),
					image = new Image();
				$this.bind('click',function(e){
					e.preventDefault();
					moveSlide('left');
				});
				image.src = $this.attr('href');
				$(image).bind('load',function(){
					$('<img src="'+$this.attr('href')+'" height="420" />').appendTo($this);
				});
				//slideData.push($this.attr('href'));
			});
		},
		moveSlide = function (dir) {
			$(document).unbind('keydown');
			$('#prev-slide, #next-slide').unbind('click');
			
			if ( dir == 'left' ) {
				$slider.stop().animate({
					marginLeft : -640
				}, 300, function(){
					$slider.css({marginLeft:0}).children(':first').detach().appendTo($slider);
					bindKeyScroller();
					bindArrowScroller();
				});
			} else if ( dir == 'right' ) {
				$slider.stop().children(':last').detach().prependTo($slider);
				$slider.css({marginLeft:-640}).animate({
					marginLeft : 0
				}, 300, function () {
					bindKeyScroller();
					bindArrowScroller();
				});
			}
		},
		bindKeyScroller = function () {
			$(document).bind('keydown', function(event) {
				//right or down arrow
				if (event.keyCode == '39' || event.keyCode == '40') {
					moveSlide('left');
					event.preventDefault();
				}
				//left or up arrow
				if (event.keyCode == '37' || event.keyCode == '38') {
					moveSlide('right');
					event.preventDefault();
				}
			});
		},
		bindArrowScroller = function () {
			$('#prev-slide').bind('click', function () {
				moveSlide('right');
			});
			$('#next-slide').bind('click', function () {
				moveSlide('left');
			});
		};
		
	$slider.css({
		width : $slider.children('li').length * 640,
		marginLeft : 0
	});
	bindKeyScroller();
	bindArrowScroller();
	gatherSlideData();

});
