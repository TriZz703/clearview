(function ($) {
	
	$(function () {		
		
		$('body').on('click', '#launchGallery', function () {
			$('#gallery').fadeIn(function () {
				$('.flexslider').css({
					width: 600
				}).flexslider({
					animation: "slide",
					start: function (slider) {
						$('body').removeClass('loading');
					},
					smoothHeight: true
				});
			});
		});
		
	});
	
} (jQuery, window, undefined));