/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('ie');

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {

			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});

			// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function() {

					window.clearTimeout(resizeTimeout);

					$body.addClass('is-resizing');

					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

				});

		}

	// Scroll back to top.
		$window.scrollTop(0);

	// Panels.
		var $panels = $('.panel');

		$panels.each(function() {

			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);

			// Closer.
				$closer
					.on('click', function(event) {
						$this.trigger('---hide');
					});

			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {

						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');

					})
					.on('---show', function() {

						// Hide other content.
							if ($body.hasClass('content-active'))
								$panels.trigger('---hide');

						// Activate content, toggles.
							$this.addClass('active');
							$toggles.addClass('active');

						// Activate body.
							$body.addClass('content-active');

					})
					.on('---hide', function() {

						// Deactivate content, toggles.
							$this.removeClass('active');
							$toggles.removeClass('active');

						// Deactivate body.
							$body.removeClass('content-active');

					});

			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {

						event.preventDefault();
						event.stopPropagation();

						$this.trigger('---toggle');

					});

		});

		// Global events.
			$body
				.on('click', function(event) {

					if ($body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

			$window
				.on('keyup', function(event) {

					if (event.keyCode == 27
					&&	$body.hasClass('content-active')) {

						event.preventDefault();
						event.stopPropagation();

						$panels.trigger('---hide');

					}

				});

	// Header.
		var $header = $('#header');

		// Links.
			$header.find('a').each(function() {

				var $this = $(this),
					href = $this.attr('href');

				// Internal link? Skip.
					if (!href
					||	href.charAt(0) == '#')
						return;

				// Redirect on click.
					$this
						.removeAttr('href')
						.css('cursor', 'pointer')
						.on('click', function(event) {

							event.preventDefault();
							event.stopPropagation();

							window.location.href = href;

						});

			});

	// Footer.
		var $footer = $('#footer');

		// Copyright.
		// This basically just moves the copyright line to the end of the *last* sibling of its current parent
		// when the "medium" breakpoint activates, and moves it back when it deactivates.
			$footer.find('.copyright').each(function() {

				var $this = $(this),
					$parent = $this.parent(),
					$lastParent = $parent.parent().children().last();

				breakpoints.on('<=medium', function() {
					$this.appendTo($lastParent);
				});

				breakpoints.on('>medium', function() {
					$this.appendTo($parent);
				});

			});

	// Main.
		var $main = $('#main');

		// Thumbs.
			$main.children('.thumb').each(function() {

				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;

				// No image? Bail.
					if ($image.length == 0)
						return;

				// Image.
				// This sets the background of the "image" <span> to the image pointed to by its child
				// <img> (which is then hidden). Gives us way more flexibility.

					// Set background.
						$image.css('background-image', 'url(' + $image_img.attr('src') + ')');

					// Set background position.
						if (x = $image_img.data('position'))
							$image.css('background-position', x);

					// Hide original img.
						$image_img.hide();

			});
			
		// Store the clicked article ID to use in Poptrox callback
		var clickedArticleId = null;
		
		// Add mousedown handler to update hash when article thumb is clicked
		// Using mousedown instead of click to ensure it runs before Poptrox processes the click
		$main.on('mousedown', '.thumb > a.image', function(e) {
			var $article = $(this).closest('.thumb');
			if ($article.length > 0 && $article.attr('id')) {
				var articleId = $article.attr('id');
				// Only update if it's an article ID (starts with "article-")
				if (articleId && articleId.indexOf('article-') === 0) {
					clickedArticleId = articleId;
					
					// Store current scroll position
					var scrollTop = $(window).scrollTop();
					var scrollLeft = $(window).scrollLeft();
					var scrollLocked = true;
					
					// Set flag SYNCHRONOUSLY - this MUST happen before location.hash assignment
					window._updatingHashFromClick = true;
					
					// Lock scroll position continuously during popup opening
					var lockScroll = function() {
						if (scrollLocked) {
							$(window).scrollTop(scrollTop);
							$(window).scrollLeft(scrollLeft);
							requestAnimationFrame(lockScroll);
						}
					};
					lockScroll();
					
					// Temporarily remove the id to prevent browser from scrolling to it
					var originalId = $article.attr('id');
					$article.removeAttr('id');
					
					// Remove "article-" prefix from hash for cleaner URL
					var hashId = articleId.replace('article-', '');
					
					// Update hash - this won't scroll since element has no id
					location.hash = hashId;
					
					// Restore the id immediately
					$article.attr('id', originalId);
					
					// Keep scroll locked during popup opening animation (Poptrox fadeSpeed is 300ms)
					setTimeout(function() {
						scrollLocked = false;
					}, 500);
					
					// Clear flag after hashchange has been processed
					setTimeout(function() {
						window._updatingHashFromClick = false;
						clickedArticleId = null;
					}, 500);
				}
			}
		});

		// Poptrox.
			$main.poptrox({
				baseZIndex: 20000,
				caption: function($a) {

					var s = '';

					$a.nextAll().each(function() {
						s += this.outerHTML;
					});

					return s;

				},
				fadeSpeed: 300,
				onPopupClose: function() { 
					$body.removeClass('modal-active');
					// Clear hash when popup closes (but only if it's an article hash)
					if (location.hash && location.hash.indexOf('#article-') === 0) {
						// Use replaceState to avoid triggering hashchange
						history.replaceState(null, '', window.location.pathname + window.location.search);
					}
				},
				onPopupOpen: function($a) { 
					$body.addClass('modal-active');
					
					// Store scroll position when popup opens and prevent scrolling during animation
					var scrollTop = $(window).scrollTop();
					var scrollLeft = $(window).scrollLeft();
					var scrollLocked = true;
					
					// Lock scroll position during popup opening animation
					var lockScroll = function() {
						if (scrollLocked) {
							$(window).scrollTop(scrollTop);
							$(window).scrollLeft(scrollLeft);
							requestAnimationFrame(lockScroll);
						}
					};
					lockScroll();
					
					// Unlock scroll after popup animation completes (Poptrox fadeSpeed is 300ms)
					setTimeout(function() {
						scrollLocked = false;
					}, 400);
					
					// Update hash to article ID when popup opens
					// Try to get article ID from stored value first, then from the element
					var articleId = clickedArticleId;
					if (!articleId) {
						// Fallback: try to get it from the anchor element
						var $link = $a && $a.jquery ? $a : $($a);
						var $article = $link.closest('.thumb');
						if ($article.length > 0 && $article.attr('id')) {
							articleId = $article.attr('id');
						}
					}
					// Only update if it's an article ID (starts with "article-")
					if (articleId && articleId.indexOf('article-') === 0) {
						// Set flag to prevent hashchange handler from interfering
						window._updatingHashFromClick = true;
						// Remove "article-" prefix from hash for cleaner URL
						var hashId = articleId.replace('article-', '');
						// Update hash - this will be visible in URL
						location.hash = hashId;
						// Clear flag after hashchange has been processed
						setTimeout(function() {
							window._updatingHashFromClick = false;
						}, 150);
					}
				},
				overlayOpacity: 0,
				popupCloserText: '',
				popupHeight: 150,
				popupLoaderText: '',
				popupSpeed: 300,
				popupWidth: 150,
				selector: '.thumb > a.image',
				usePopupCaption: true,
				usePopupCloser: true,
				usePopupDefaultStyling: false,
				usePopupForceClose: true,
				usePopupLoader: true,
				usePopupNav: false,
				windowMargin: 50
			});

			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main[0]._poptrox.windowMargin = 0;
				});

				breakpoints.on('>xsmall', function() {
					$main[0]._poptrox.windowMargin = 50;
				});

})(jQuery);
