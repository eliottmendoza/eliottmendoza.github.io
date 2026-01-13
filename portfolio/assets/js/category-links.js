function getHashFilter() {
    // get filter=filterName
    var matches = location.hash.match( /filter=([^&]+)/i );
    var hashFilter = matches && matches[1];
    return hashFilter && decodeURIComponent( hashFilter );
  }
  
  // init Isotope
  var $grid = $('.grid');
  
  // bind filter button click
  var $filterButtonGroup = $('.filter-button-group');
  $filterButtonGroup.on( 'click', 'button', function() {
    var filterAttr = $( this ).attr('data-filter');
    // Remove period from filter value for URL
    var urlFilter = filterAttr === '*' ? filterAttr : filterAttr.substring(1);
    // set filter in hash
    location.hash = urlFilter;
  });
  
  var isIsotopeInit = false;
  
  function openArticle(articleId) {
    var $article = $('#' + articleId);
    if ($article.length === 0) {
      return false;
    }
    
    // Store current scroll position to restore it later
    var scrollTop = $(window).scrollTop();
    var scrollLeft = $(window).scrollLeft();
    
    // Check if article is already visible (not filtered out)
    var isVisible = $article.is(':visible') && $article.css('display') !== 'none';
    
    // Only reset filter if article is not visible
    if (!isVisible) {
      // Show all items so the article is visible
      $grid.isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        filter: '*'
      });
      
      // Reset filter button to "all"
      $filterButtonGroup.find('.is-checked').removeClass('is-checked');
      $filterButtonGroup.find('[data-filter="*"]').addClass('is-checked');
    }
    
    // Wait for Isotope to finish (if we changed filter), then open the article
    setTimeout(function() {
      // Restore scroll position before doing anything
      $(window).scrollTop(scrollTop);
      $(window).scrollLeft(scrollLeft);
      
      var $imageLink = $article.find('a.image');
      if ($imageLink.length > 0) {
        // Store scroll again right before click
        var savedScrollTop = $(window).scrollTop();
        var savedScrollLeft = $(window).scrollLeft();
        
        // Trigger click on the image link to open Poptrox popup
        $imageLink[0].click();
        
        // Restore scroll position immediately and on next frames
        $(window).scrollTop(savedScrollTop);
        $(window).scrollLeft(savedScrollLeft);
        
        requestAnimationFrame(function() {
          $(window).scrollTop(savedScrollTop);
          $(window).scrollLeft(savedScrollLeft);
        });
        
        setTimeout(function() {
          $(window).scrollTop(savedScrollTop);
          $(window).scrollLeft(savedScrollLeft);
        }, 10);
      }
    }, isVisible ? 50 : 150);
    
    return true;
  }
  
  function onHashchange() {
    // Don't process hashchange if we're updating hash from a normal click
    // Check this FIRST before doing anything else - this is critical!
    if (window._updatingHashFromClick === true) {
      return;
    }
    
    // Also don't process if Poptrox popup is already open/opening (modal-active class)
    // This means a click already triggered the popup, so we don't need to open it again
    if ($('body').hasClass('modal-active')) {
      return;
    }
    
    var hash = location.hash.substring(1);
    
    // Check if hash is an article by trying to find an element with id "article-" + hash
    // This is more robust than checking against a hardcoded filter list
    if (hash && hash !== '*') {
      var articleId = 'article-' + hash;
      var $article = $('#' + articleId);
      
      // If an element with this ID exists, it's an article
      if ($article.length > 0) {
        // Triple-check the flag and modal state haven't changed
        if (window._updatingHashFromClick !== true && !$('body').hasClass('modal-active')) {
          if (openArticle(articleId)) {
            return;
          }
        }
      } else {
        // If element doesn't exist yet, it might still be loading
        // Try again after a short delay (only on initial page load)
        if (!isIsotopeInit && document.readyState !== 'complete') {
          setTimeout(function() {
            var $articleRetry = $('#' + articleId);
            if ($articleRetry.length > 0 && window._updatingHashFromClick !== true && !$('body').hasClass('modal-active')) {
              openArticle(articleId);
            }
          }, 100);
        }
      }
    }
    
    // Otherwise, treat as filter hash
    var hashFilter = hash;
    if ( !hashFilter && isIsotopeInit ) {
      return;
    }
    isIsotopeInit = true;
    // Add period back for Isotope filter
    var isotopeFilter = hashFilter === '*' ? hashFilter : '.' + hashFilter;
    // filter isotope
    $grid.isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows',
      filter: isotopeFilter
    });
    // set selected class on button
    if ( hashFilter ) {
      $filterButtonGroup.find('.is-checked').removeClass('is-checked');
      // Add period back for button selection
      var buttonFilter = hashFilter === '*' ? hashFilter : '.' + hashFilter;
      $filterButtonGroup.find('[data-filter="' + buttonFilter + '"]').addClass('is-checked');
    }
  }
  
  $(window).on( 'hashchange', onHashchange );
  
  // Process hash on page load (both DOM ready and window load for maximum compatibility)
  $(document).ready(function() {
    // Small delay to ensure all scripts are loaded
    setTimeout(function() {
      onHashchange();
    }, 50);
  });
  
  // Also check on window load in case DOM ready wasn't enough
  $(window).on('load', function() {
    // Only process if we have a hash and Isotope wasn't initialized with it yet
    if (location.hash && location.hash.length > 1) {
      var hash = location.hash.substring(1);
      if (hash !== '*' && $('#' + 'article-' + hash).length > 0) {
        // We have an article hash, make sure it's processed
        if (!window._updatingHashFromClick && !$('body').hasClass('modal-active')) {
          setTimeout(function() {
            onHashchange();
          }, 100);
        }
      }
    }
  });
  