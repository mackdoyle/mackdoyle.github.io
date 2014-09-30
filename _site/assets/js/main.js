( function( window ) {

'use strict';

  // Init Isotope
  var $container = $('.panels-container').imagesLoaded( function() {
    $container.isotope({
      // options
      itemSelector: '.panel-container',
      layoutMode: 'masonry'
    });
  });


})( window );
