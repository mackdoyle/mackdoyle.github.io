var theTop = $("#article-content").offset().top;

$(document).scroll(function() {
console.log('theTop: ' + theTop);
console.log('ScrollTop: ' + $(this).scrollTop());
  if($(this).scrollTop() > theTop) {
    $('#wrapped').css({"border":"2px solid red"});
  }
});

/*

$(document).ready(function(){
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
});
*/