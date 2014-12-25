$(document).ready(function(){
  var slides = $('#slideshow > figure');
  var slideCount = slides.length;
  var count =  0;

  // Auto Transition
  $("#slideshow > figure:gt(0)").hide();


  var transition = setInterval(function() {
    // Stop interval on last element
    count ++;
    if (count === (slideCount-1)){
      clearInterval(transition);
      console.log('Cleared!');
    }

    // Create transition effect
    $('#slideshow > figure:first')
      .fadeOut(1000)
      .next()
      .addClass('current')
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow')
      .removeClass('current')
      .next()
      .hasClass('last');
  },  3000);



  // Manual transitions
  /*
    var counter = 0, // to keep track of current slide
        $items = document.querySelectorAll('.slideshow figure'), // a collection of all of the slides, caching for performance
        numItems = $items.length; // total number of slides

    // this function is what cycles the slides, showing the next or previous slide and hiding all the others
    var showCurrent = function(){
      var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show

      // remove .show from whichever element currently has it
      // http://stackoverflow.com/a/16053538/2006057
      [].forEach.call( $items, function(el){
        el.classList.remove('show');
      });

      // add .show to the one item that's supposed to have it
      $items[itemToShow].classList.add('show');
    };

    // add click events to prev & next buttons
    document.getElementById('next').addEventListener('click', function() {
         counter++;
         showCurrent();
      }, false);

    document.getElementById('prev').addEventListener('click', function() {
         counter--;
         showCurrent();
      }, false);
  */
});