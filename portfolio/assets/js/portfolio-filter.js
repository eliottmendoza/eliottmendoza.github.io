// Portfolio Filter Navigation - Simple approach
$(document).ready(function($) {
	console.log('portfolio-filter.js loaded successfully');
	
	// Check if poptrox plugin is available
	console.log('jQuery poptrox available:', typeof $.fn.poptrox !== 'undefined');
	
	// Store reference to poptrox instance
	var poptroxInstance = null;
	
	// Try to load poptrox manually if it's not available
	if (typeof $.fn.poptrox === 'undefined') {
		console.log('Attempting to load poptrox script manually...');
		
		// Create a script element to load poptrox
		var script = document.createElement('script');
		script.src = 'assets/js/jquery.poptrox.min.js';
		script.onload = function() {
			console.log('Poptrox script loaded manually');
			// Try to initialize poptrox now
			if (typeof $.fn.poptrox !== 'undefined') {
				console.log('Manually initializing poptrox...');
				poptroxInstance = $('#main').poptrox({
					baseZIndex: 20000,
					caption: function($a) {
						var s = '';
						$a.nextAll().each(function() {
							s += this.outerHTML;
						});
						return s;
					},
					fadeSpeed: 300,
					onPopupClose: function() { $('body').removeClass('modal-active'); },
					onPopupOpen: function() { $('body').addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.thumb:visible > a.image',
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
				});
				console.log('Poptrox manually initialized');
			}
		};
		script.onerror = function() {
			console.log('Failed to load poptrox script');
		};
		document.head.appendChild(script);
	} else {
		console.log('Poptrox plugin not available!');
	}
	
	// Set up filter button handlers
	$(document).on('click', '.filter-button-group .button', function() {
		console.log('Filter button clicked:', $(this).data('filter'));
		
		// Wait for Isotope animation to complete, then refresh poptrox
		setTimeout(function() {
			console.log('Attempting to reinitialize poptrox...');
			
			// Check for poptrox instance in multiple ways
			var hasPoptrox = $('#main').data('poptrox') || poptroxInstance || $('#main')[0]._poptrox;
			console.log('Poptrox instance found:', hasPoptrox);
			
			// Force poptrox to refresh its item list
			if (hasPoptrox) {
				console.log('Destroying existing poptrox instance...');
				$('#main').poptrox('destroy');
				poptroxInstance = null;
				
				console.log('Reinitializing poptrox...');
				poptroxInstance = $('#main').poptrox({
					baseZIndex: 20000,
					caption: function($a) {
						var s = '';
						$a.nextAll().each(function() {
							s += this.outerHTML;
						});
						return s;
					},
					fadeSpeed: 300,
					onPopupClose: function() { $('body').removeClass('modal-active'); },
					onPopupOpen: function() { $('body').addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.thumb:visible > a.image',
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
				});
				console.log('Poptrox reinitialized with selector: .thumb:visible > a.image');
			} else {
				console.log('No existing poptrox instance found');
			}
		}, 1000); // Increased delay to ensure Isotope has finished
	});
});
