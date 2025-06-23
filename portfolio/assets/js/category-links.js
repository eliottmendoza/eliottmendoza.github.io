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
  
  function onHashchange() {
    var hashFilter = location.hash.substring(1);
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
  
  // trigger event handler to init Isotope
  onHashchange();
  