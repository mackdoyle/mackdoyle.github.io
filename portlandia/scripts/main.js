/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';


 L.mapbox.accessToken = 'pk.eyJ1IjoibWFja2RveWxlIiwiYSI6ImhqUGZNVmMifQ.lRcp3o-ilj3gNZEQ7HzRWg';
 
/* Set map and initial map position
 * Dark Map:          examples.map-y7l23tes
 * Light Clean Map:   duncangraham.b134a19e
 * Mapbox light map:  examples.map-i80bb8p3
 * Woodcut:  					examples.xqwfusor
 * Gray Twilight:  		eleanor.ipncow29
 */

var map = L.mapbox.map('map', 'eleanor.ipncow29')
.setView([45.523999,-122.665000], 14);

/*
 * --------------------------------------------------
 * LOAD MAP DATA FROM JSON
 * --------------------------------------------------
 */
var geojson = (function() {
      var json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': '../data/listings.json',
        'dataType': 'json',
        'success': function (data) {
            json = data;
        }
      });
      return json;
  })();


/*
 * --------------------------------------------------
 * MAP AND SIDEBAR INIT
 * --------------------------------------------------
 */

/* Add locations to map*/
var listings = document.getElementById('listings');
var locations = L.mapbox.featureLayer().addTo(map);
var route ="";

locations.setGeoJSON(geojson);

/* Set current active Item */
function setActive(el) {
  var siblings = listings.getElementsByTagName('div');
  for (var i = 0; i < siblings.length; i++) {
    siblings[i].className = siblings[i].className
    .replace(/active/, '').replace(/\s\s*$/, '');
  }

  el.className += ' active';
}

/* 
 * Build out HTML and set data for the left rail and the map marker pop-ups
 * ---------------------------------------------------------------------------
 */
locations.eachLayer(function(locale) {

	/* Initialize defaults for meta content */
  var prop = locale.feature.properties;
  route += locale.feature.geometry.coordinates + ';';
  console.log(route);


  /*
   * --------------------------------------------------
   * POP-UP
   * Init map marker pop-up 
   * --------------------------------------------------
   */
	
	if (prop.img) {
			var popup = '<div style="background: url(' + prop.img + '); background-size: cover; width: 100%; height: 100%; min-width:400px; min-height:300px" >';
		  popup += '<h3>' + prop.name + '</h3><div>';
		  popup += '</div></div>';
		  locale.bindPopup(popup);
	} else {
		  var popup = '<div style="background: url(' + prop.img + '); background-size: cover; width: 100%; height: 100%;" >';
		  popup += '<h3>' + prop.name + '</h3><div>';
		  
		  if (prop.address) {
		    popup += '<small>' + prop.address + '</small>';
		  }

		  if (prop.district) {
		     popup += '<br /><small>' + prop.district + '</small>';
		  }

		  if (prop.img) {
		     popup += '<br /><img src="' + prop.img + '" border="0" width="50" height="50">';
		  }

		  popup += '</div></div>';
		  locale.bindPopup(popup);
	}


  /*
   * --------------------------------------------------
   * Init sidebar data 
   * --------------------------------------------------
   */

  var listing = listings.appendChild(document.createElement('div'));
  listing.className = 'item';

  //Add status class (ex: muted)
  if (prop.status) {
  	listing.className = listing.className + ' ' + prop.status;
  }

  // Create an anchor tag for the Title
  var link = listing.appendChild(document.createElement('a'));
  link.href = '#';
  link.className = 'title';

  // Create an anchor tag for outbound links
  var url = listing.appendChild(document.createElement('a'));
  url.className = 'url';
  url.target = '_blank';

  link.innerHTML = prop.name;
  
  // Address (sidebar)
  if (prop.address) {
    link.innerHTML += '<br /><small class="quiet">' + prop.address + '</small>';
  }
  
  // Cross Street
  //if (prop.crossStreet) {
    //link.innerHTML += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
    //popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
 // }
  
  // District  (sidebar and popup)
  var details;
  if (prop.district) {
    details = listing.appendChild(document.createElement('div'));
  	details.innerHTML = '<small class="quiet">' + prop.district + '</small>';
  }
  
  // City
  //var details = listing.appendChild(document.createElement('div'));
  //details.innerHTML = prop.city;
  
  // Phone
  if (prop.phone) {
    details.innerHTML += ' &middot; ' + prop.phoneFormatted;
  }

  // URL
  if (prop.url) {
  	url.href = prop.url;
    url.innerHTML += '<small>' + prop.url + '</small>';
  }

  /*
   * --------------------------------------------------
   * Events
   * --------------------------------------------------
   */

  // Set active styling for a listing
  link.onclick = function() {
    setActive(listing);

    // When a menu item is clicked, animate the map to center
    // its associated locale and open its popup.
    map.setView(locale.getLatLng(), 16);
    locale.openPopup();
    return false;
  };

  // Marker interaction
  locale.on('click', function() {
    // 1. center the map on the selected marker.
    map.panTo(locale.getLatLng());

    // 2. Set active the markers associated listing.
    setActive(listing);
  });



  /* 
   * Define the marker for each listing
   */
  if (prop.status === 'muted'){
  	locale.setIcon(L.icon({
  		iconUrl: '../images/marker-condo-alt-muted@2x.png',
	    iconSize: [56, 56],
	    iconAnchor: [28, 28],
	    popupAnchor: [0, -34]
	  }));
  } else {
	  locale.setIcon(L.icon({
	    iconUrl: '../images/marker-condo-alt@2x.png',
	    iconSize: [56, 56],
	    iconAnchor: [28, 28],
	    popupAnchor: [0, -34]
	  }));
		}
  
});


	/*
	* Build a route from one marker to the next
	*
	*/
	var buildRouteFromGeoJson = function (geojson) {
	
	}
	 


/*
 * --------------------------------------------------
 * Screen Size Management for Map
 * Loads a static map on small screens
 * --------------------------------------------------
 */

/*
var currentWidth = document.body.clientWidth,
thresholdWidth = 550;

function buildMap() {
  if(currentWidth>thresholdWidth) { //If Large Screen
    // Do nothing
  } else {
    if($('#static-img').length > 1) { 
      
       // If static image placeholder exists, construct a static map url

      // A bounding box in west, south, east, north order.
      var bounds = [
          5.668343999999995,
          45.111511000000014,
          5.852471999999996,
          45.26800200000002
      ];

      // The size of the desired map.
      var size = [320, 240];

      // Calculate a zoom level and centerpoint for this map.
      var vp = geoViewport.viewport(bounds, size);

      document.getElementById('static-map').src =
        'https://api.tiles.mapbox.com/v4/examples.map-i80bb8p3/' +
        vp.center.join(',') + ',' +
        vp.zoom + '/' +
        size.join('x') + '.png' +
        '?access_token=' + L.mapbox.accessToken;
    }
  }
}

// Manage map build on load
$(document).ready(function(){
  buildMap();
});

// Manage map build on screen resze
$(window).resize(function() {
  currentWidth = document.body.clientWidth;
    buildMap();
});
*/


}(window, document, L));