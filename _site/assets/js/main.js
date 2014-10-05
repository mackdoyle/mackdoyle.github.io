(function(window) {
    'use strict';
    // Isotope
    // -------------------------------------------------
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
        //set styles for animations after isotope inits so they do not affect its calculations.
        $('.teaser').css({
            'opacity': 0.0
        });
        $('.teaser').animate({
            'opacity': 1.0
        }, 400);
    }
    //Fade top bar on scroll
    // -------------------------------------------------
/*
    $(window).scroll(function(){
      var scrollTop = $(window).scrollTop();
      if(scrollTop !== 0) {
        $('.top-bar').stop().animate({'opacity':'0.2'},400);
      }else {
        $('.top-bar').stop().animate({'opacity':'1'},400);
      }
    });

    $('.top-bar').hover(
      function (e) {
        var scrollTop = $(window).scrollTop();
        if(scrollTop !== 0){
          $('.top-bar').stop().animate({'opacity':'1'},400);
        }
      },
      function (e) {
        var scrollTop = $(window).scrollTop();
        if(scrollTop !== 0){
          $('.top-bar').stop().animate({'opacity':'0.2'},400);
        }
      }
    );
*/
    //SCROLL FUNCTIONS
    var nav = $('.top-bar'),
        navHeight = nav.height(),
        scrollPosition = 0;

    $(window).on('scroll', function(e) {
        //VARS
        var w = $(this),
            newScrollPosition = w.scrollTop(),
            html = $('html');
        if (!html.hasClass('desktop')) {
            return;
        }
        //HIDE/SHOW NAV
        //dont do anything until you get past the header's height...
        if (newScrollPosition <= navHeight) {
            nav.stop(true, true).css('display', 'block');
        } else {
            //scrolling up
            if (scrollPosition > newScrollPosition) {
                if (!nav.is(':visible')) {
                    nav.stop(true, true).slideDown(100, function() {
                        $(this).css('overflow', '');
                    });
                }
            } else if (!nav.is(':animated')) {
                //scrolling down
                nav.stop(true, true).fadeOut(300);
            }
        }
        scrollPosition = newScrollPosition;
    });
})(window);