/**
 * Taken form the Iconic website to investigate how they fit the hero to the broswer window
 */

'use strict';

/**
 * Force reload of iframe to update size
 *(Kickstarter iframe embed content does static sizing on load that breaks fitvids during resize)
 */
function resizeKickstarterVideo() {
  var iframeSrc = $('#kickstarter-video').attr('src');
  $('#kickstarter-video').attr('src', iframeSrc);
}


/**
 * Set height of the projects on homepage
 */
function fillHeight(elem) {
  var windowH = $(window).height();
  var wrapperH = $(elem).height();

  if (windowH > wrapperH) {
    $(elem).css({
      'height': ($(window).height() / 1.2) + 'px'
    });
  }
}


$(document).ready(function () {

  // SVG injector
  $('.svg-inject').svgInject();


  // Syntax highlighting
  prettyPrint();


  // Height of the hero on homepage
  fillHeight('.hero');


  // Smooth scroll
  $('.hero a[href^="#"]').on('click', function (e) {
    // console.log('scroll');
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500); // Opera and IE require "html" animated
  });


  // Homepage row link
  $('article.has-link').click(function(){ //link that is clicked on
    //var currentId = $(this).attr('id'); //capture id of clicked item
    var url = $(this).find('.btn').attr('href');
    window.location = url; //load new page
    return false;
  });


  // Theming
  $('.themes .style-stroke-rounded-toggle').on('change', function (e) {
    var newClass = '';
    if ($(this).is(':checked')) {
      newClass = "iconic-style-stroke-rounded";
    }

    $('.iconic').each(function() {
      var classes = $(this).attr("class").split(" ").filter(function(item) {
          return item.indexOf("iconic-style-stroke-rounded") === -1 ? item : "";
      });
      classes.push(newClass);
      $(this).attr("class", classes.join(" "));
    });
  });

  $('.themes .style-hollow-toggle').on('change', function (e) {
    var newClass = '';
    if ($(this).is(':checked')) {
      newClass = "iconic-style-hollow";
    }

    $('.iconic').each(function() {
      var classes = $(this).attr("class").split(" ").filter(function(item) {
        return item.indexOf("iconic-style-hollow") === -1 ? item : "";
      });
      classes.push(newClass);
      $(this).attr("class", classes.join(" "));
    });
  });

  $('.themes .theme-select').on('change', function (e) {
    var newClass = '';
    switch(e.target.value) {
      case 'slate':
        newClass = "iconic-theme-slate";
        break;
      case 'monochrome':
        newClass = "iconic-theme-monochrome";
        break;
      case 'sand':
        newClass = "iconic-theme-sand";
        break;
      case 'xray':
        newClass = "iconic-theme-xray";
        break;
    }
    $('.iconic').each(function() {
      var classes = $(this).attr("class").split(" ").filter(function(item) {
          return item.indexOf("iconic-theme") === -1 ? item : "";
      });
      classes.push(newClass);
      $(this).attr("class", classes.join(" "));
    });
  });

  $('.themes .style-strokeweight-select').on('change', function (e) {
    var newClass = '';
    switch(e.target.value) {
      case 'light':
        newClass = "iconic-style-strokeweight-light";
        break;
      case 'thin':
        newClass = "iconic-style-strokeweight-thin";
        break;
      case 'hairline':
        newClass = "iconic-style-strokeweight-hairline";
        break;
      case 'thick':
        newClass = "iconic-style-strokeweight-thick";
        break;
    }
     $('.iconic').each(function() {
        var classes = $(this).attr("class").split(" ").filter(function(item) {
            return item.indexOf("iconic-style-strokeweight") === -1 ? item : "";
        });
        classes.push(newClass);
        $(this).attr("class", classes.join(" "));
    });
  });
});

$(window).load(function () {
  $('body').addClass('all-loaded');
});

var _debounceResizeTimer;
$(window).resize(function () {
  fillHeight('.hero');

  // Since this is reloading an iframe src, try to only call it once when the user stops resizing
  clearTimeout(_debounceResizeTimer);
  _debounceResizeTimer = setTimeout(resizeKickstarterVideo, 250);
});


