(function(window) {
  'use strict';

    // Article Progress Bar
    // -----------------------------------------------------------------
    /*
     * @Todo: Complete code that renders thin progress at the bottom of the viewport and progresses as you read through an article
     * @Todo: add css. Something like:
     *  .read-line{
     *    display: inline-block;
     *    position: fixed;
     *    bottom: 0; left: 0;
     *    width: 0%; height: 3px;
     *    max-width: 100% !important;
     *    background-color: fuchsia;
     * }
     */

    /*
    // get offset from viewport position
    var win = $(window);

    $.fn.viewportOffset = function() {
      var offset = $(this).offset();
      return {
        left: offset.left + win.scrollLeft(),
        top: offset.top + win.scrollTop()
      };
    };


    $(document).ready(function(){
      // Element to measure
      var article = $('article'),
          // Height of the article
          readHeight = article.height(),
          // Calculate offset for a starting point
          readStartpoint = article.offset().top*1.8,
          // set default
          currentPosition = 0;
      $(window).scroll(function(){
        // turn all this into percentages
        currentPosition = (article.viewportOffset().top-readStartpoint)/readHeight*100;
        //$('#count').text(currentPosition);
        $('.read-line').css('width', currentPosition + '%');
      })
    });
    */

    // Isotope
    // -----------------------------------------------------------------
    // Init Isotope on Projects Page
    if ($(".panels-container").length) {
        var $projectsContainer = $('.panels-container').imagesLoaded(function() {
            $projectsContainer.isotope({
                // options
                itemSelector: '.panel-container',
                layoutMode: 'masonry'
            });
        });
    }

    // Init Isotope on Teasers Page
    //If styling affects sizing, set styles for animations after isotope inits so they do not affect its calculations.
    $('.teaser').css({
        'opacity': 0.0
    });
    $('.teaser').animate({
        'opacity': 1.0
    }, 800);

    if ($(".teaser").length) {
        //init isotope
        var $teasersContainer = $('.content-container').imagesLoaded(function() {
            $teasersContainer.isotope({
                // options
                itemSelector: '.teaser',
                layoutMode: 'masonry',

                masonry: {
                    gutter: 25
                }
            });
        });

    }

    //Init masrony on teasers using Stalactite
    /*
    if ($(".teaser").length) {
      $('.content-container').stalactite();
        updateLoader(function() {
        $('.content-container').fadeIn();
      });
    }
    */

    //Topbar Effects
    // -----------------------------------------------------------------
    var nav = $('.top-bar'),
        navHeight = nav.height(),
        scrollPosition = 0;

    $(window).on('scroll', function(e) {
        //VARS
        console.log('begining scroll on');
        var w = $(this),
            newScrollPosition = w.scrollTop(),
            html = $('html');
            console.log('w: ' + w + 'newScrollPosition: ' + newScrollPosition + 'html: ' + html);
        if (!html.hasClass('desktop')) {
            return;
        }
        //HIDE/SHOW NAV
        // Dont do anything until you get past the header's height...
        if (newScrollPosition <= navHeight) {
            nav.stop(true, true).css('display', 'block');
            console.log('new pos: ' + newScrollPosition);
        } else {
            //scrolling up
            console.log('New pos: ' + newScrollPosition);
            if (scrollPosition > newScrollPosition) {
                if (!nav.is(':visible')) {
                    nav.stop(true, true).slideDown(100, function() {
                        $(this).css('overflow', '');
                    });
                }
                console.log('scrolling up');
            } else if (!nav.is(':animated')) {
                //scrolling down
                nav.stop(true, true).slideUp(300);
                console.log('scrolling down');
            }
        }
        scrollPosition = newScrollPosition;
    });


    // EVENT LOGGING TO GOOGLE ANALYTICS
    // -----------------------------------------------------------------
    // Track basic JavaScript errors
    /*
    window.addEventListener('error', function(e) {
        _gaq.push([
            '_trackEvent',
            'JavaScript Error',
            e.message,
            e.filename + ':  ' + e.lineno,
            true
        ]);
    });

    // Track AJAX errors (jQuery API)
    $(document).ajaxError(function(e, request, settings) {
        _gaq.push([
            '_trackEvent',
            'Ajax error',
            settings.url,
            e.result,
            true
        ]);
    });
    */
})(window);