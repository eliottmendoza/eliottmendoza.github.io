// Portfolio Filter Navigation
$(document).ready(function($) {
	// Track current filter
	var currentFilter = '*';

	// Function to update poptrox navigation based on current filter
	function updatePoptroxNavigation() {
		// Get all visible articles that match the current filter
		var $filteredArticles = currentFilter === '*' 
			? $('#main').find('.thumb').filter(':visible')
			: $('#main').find('.thumb').filter('.' + currentFilter).filter(':visible');
		
		// If no articles are visible, return early
		if ($filteredArticles.length === 0) return;
		
		// Update navigation indices
		$('.poptrox-next, .poptrox-prev').data('index', 0); // Reset to 0
		
		// Get current visible article
		var $currentArticle = $('.is-visible').closest('.thumb');
		if ($currentArticle.length) {
			var currentIndex = $filteredArticles.index($currentArticle);
			$('.poptrox-next').data('index', currentIndex + 1);
			$('.poptrox-prev').data('index', currentIndex - 1);
		}
	}

	// Update filter when buttons are clicked
	$('.filter-button-group').on('click', 'button', function() {
		currentFilter = $(this).data('filter');
		updatePoptroxNavigation();
	});

	// Initialize with all items
	updatePoptroxNavigation();

	// Hack: Update navigation after Isotope animation
	$('.filter-button-group').on('click', 'button', function() {
		setTimeout(function() {
			updatePoptroxNavigation();
		}, 500); // Wait for Isotope animation
	});

	// Handle poptrox navigation clicks
	$('.poptrox-next, .poptrox-prev').on('click', function(e) {
		e.preventDefault(); // Prevent default behavior
		
		var $filteredArticles = currentFilter === '*' 
			? $('#main').find('.thumb').filter(':visible')
			: $('#main').find('.thumb').filter('.' + currentFilter).filter(':visible');
		
		if ($filteredArticles.length === 0) return;
		
		// Get current visible article
		var $currentArticle = $('.is-visible').closest('.thumb');
		if (!$currentArticle.length) {
			// If no article is visible, start from first one
			$currentArticle = $filteredArticles.first();
		}
		
		var currentIndex = $filteredArticles.index($currentArticle);
		var nextIndex = $(this).hasClass('poptrox-next') ? currentIndex + 1 : currentIndex - 1;
		
		// Handle wrap-around
		if (nextIndex >= $filteredArticles.length) nextIndex = 0;
		if (nextIndex < 0) nextIndex = $filteredArticles.length - 1;
		
		if ($filteredArticles.length > 0) {
			var $nextArticle = $filteredArticles.eq(nextIndex);
			var $nextImage = $nextArticle.find('> a.image');
			
			// Trigger click on next image
			$nextImage.trigger('click');
			
			// Update navigation indices
			$('.poptrox-next').data('index', nextIndex + 1);
			$('.poptrox-prev').data('index', nextIndex - 1);
		}
	});
});
