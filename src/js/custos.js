$(document).ready(function(){
  "use strict";

// Sticky headerbar on scroll
/* Not currently in use...
var $topbar = $("#top-bar"),
    y_pos = $topbar.offset().top,
    height = $topbar.height();

$(document).scroll(function(){
  var scrollTop = $(this).scrollTop();

  if (scrollTop > y_pos + height){
    $topbar.addClass("top-bar-fixed").animate({ top: 0 });
  } else if (scrollTop <= y_pos){
    $topbar.removeClass("top-bar-fixed").clearQueue().animate({ top: "-44px" }, 0);
  }
});
*/




// Indent the body copy as it touches the nav icons during a scroll event
// @TODO: Still need A LOT of work
var theTop = $("#article-content").offset().top;

$(document).scroll(function() {
console.log('theTop: ' + theTop);
console.log('ScrollTop: ' + $(this).scrollTop());
  if($(this).scrollTop() > theTop) {
    $('#wrapped').css({"border":"2px solid red"});
  }
});

/*


  // Get an element's position on the canvas
  function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
  }

  var myElement = document.getElementById("article-content");
  var position = getPosition(myElement);
  alert("The image is located at: " + position.x + ", " + position.y);
*/
});
