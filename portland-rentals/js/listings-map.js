
 L.mapbox.accessToken = 'pk.eyJ1IjoibWFja2RveWxlIiwiYSI6ImhqUGZNVmMifQ.lRcp3o-ilj3gNZEQ7HzRWg';
 
/* Set map and initial map position
 * Dark Map:          examples.map-y7l23tes
 * Light Clean Map:   duncangraham.b134a19e
 * Mapbox light map:  examples.map-i80bb8p3
 */

var map = L.mapbox.map('map', 'examples.map-i80bb8p3')
.setView([45.523999,-122.665000], 14);


var geojson = [
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.69875209999998, 45.5341627
            ]
          },
          "properties": {
            "name": "The Benevento",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Northwest",
            "address": "1606 NW 23rd Ave. #208",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97210",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.70078410000002, 45.53404
            ]
          },
          "properties": {
            "name": "Sawyer's Row ",
            "price": "",
            "notes": "AFFORDABLE",
            "phoneFormatted": "",
            "phone": "",
            "district": "Northwest",
            "address": "1970 NW Raleigh St #311",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.69721119999997, 45.5226967
            ]
          },
          "properties": {
            "name": "Saint Clair Apartments",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Northwest",
            "address": "735 SW Saint Clair Ave.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97205",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.69210659999999, 45.5325397
            ]
          },
          "properties": {
            "name": "20 Pettygrove Apartments",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Northwest",
            "address": "1976 NW Pettygrove St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6829043000000200, 45.5252531
            ]
          },

          "properties": {
            "name": "The Janey Apartments",
            "price": "",
            "notes": "LOFTY",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "1155 NW Everett St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.67670780000003, 45.5273226
            ]
          },
          "properties": {
            "name": "Hoyt",
            "price": "",
            "notes": "LOFTY,  AFFORDABLE, BUMS",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "610 NW Hoyt St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6794946, 45.52692340000001
            ]
          },
          "properties": {
            "name": "Honeyman Hardware Lofts",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "555 NW Park Ave.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.68417199999999, 45.531267
            ]
          },
          "properties": {
            "name": "The Wyatt Apartments",
            "price": "",
            "notes": "LOFTY, EXPENSIVE",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "1221 NW Marshall St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.68094480000002, 45.5274434
            ]
          },
          "properties": {
            "name": "10th At Hoyt Apartments",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "925 NW Hoyt St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.68298119999997, 45.5261248
            ]
          },
          "properties": {
            "name": "McKenzie",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "408 NW 12th Ave 208",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.68361800000002, 45.53058610000001
            ]
          },
          "properties": {
            "name": "Asa",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Pearl",
            "address": "1200 NW Marshall St",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6719569, 45.5273017
            ]
          },
          "properties": {
            "name": "710 NW Naito",
            "price": "",
            "notes": "SPACIOUS, OLDER, ISOLATED, WATERFRONT",
            "phoneFormatted": "",
            "phone": "",
            "district": "OldTown",
            "address": "710 NW Naito Pkwy #C16",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.68186224524482, 45.50993255140572
            ]
          },
          "properties": {
            "name": "The Louisa",
            "price": "",
            "notes": "DAMN, AFFORDABLE",
            "phoneFormatted": "",
            "phone": "",
            "district": "Downtown",
            "address": "NW Th Ave. #12312",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97209",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6857498, 45.51470459999999 
            ]
          },
          "properties": {
            "name": "1500 SW 11th Ave",
            "price": "",
            "notes": "DAMN, 2K, SPACIOUS",
            "phoneFormatted": "",
            "phone": "",
            "district": "Downtown",
            "address": "1500 SW 11th Ave. #404.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97201",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6794873, 45.5097989
            ]
          },
          "properties": {
            "name": "Harrison Tower Apartment Homes Apartments",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Downtown",
            "address": "222 SW Harrison St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97201",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
               -122.6580525, 45.5312075
            ]
          },
          "properties": {
            "name": "Hassalo on Eighth",
            "price": "",
            "notes": "NEW",
            "phoneFormatted": "",
            "phone": "",
            "district": "Downtown",
            "address": "700 NE Multnomah St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.6741978, 45.5077861
            ]
          },
          "properties": {
            "name": "Mint Urban RiverPlace",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Downtown",
            "address": "2083 SW River Dr.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.64576310000001, 45.5235833
            ]
          },
          "properties": {
            "name": "Matador",
            "price": "",
            "notes": "AFFORDABLE",
            "phoneFormatted": "",
            "phone": "",
            "district": "Buckman",
            "address": "1950 NE Couch St.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St",
            "postalCode": "97232",
            "state": "OR"
          }
        },
        {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              -122.65535979999999, 45.5224012
            ]
          },
          "properties": {
            "name": "Lower Burnside Lofts Apartments",
            "price": "",
            "notes": "",
            "phoneFormatted": "",
            "phone": "",
            "district": "Buckman",
            "address": "30 SE 10th Ave.",
            "city": "Portland",
            "country": "United States",
            "crossStreet": "at 15th St", 
            "postalCode": "97214",
            "state": "OR"
          }
        }
      ]
    }

  ];

  /* Add locations to map*/
  var listings = document.getElementById('listings');
  var locations = L.mapbox.featureLayer().addTo(map);

  locations.setGeoJSON(geojson);

  /* Set active Item */
  function setActive(el) {
    var siblings = listings.getElementsByTagName('div');
    for (var i = 0; i < siblings.length; i++) {
      siblings[i].className = siblings[i].className
      .replace(/active/, '').replace(/\s\s*$/, '');
    }

    el.className += ' active';
  }

  /* 
   * Set location information in side bar list 
   */
  locations.eachLayer(function(locale) {

    // Shortcut for locale.feature.properties
    var prop = locale.feature.properties;

    // Set marker pop-up data
    var popup = '<h3>' + prop.name + '</h3><div>';

    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    
    link.innerHTML = prop.name;
    
    // Address (sidebar and popup)
    if (prop.address) {
      link.innerHTML += '<br /><small class="quiet">' + prop.address + '</small>';
      popup += '<br /><small class="quiet">' + prop.address + '</small>';
    }
    
    // Cross Street
    //if (prop.crossStreet) {
      //link.innerHTML += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
      //popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
   // }
    
    // District  (sidebar and popup)
    if (prop.district) {
      var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.district;
       popup += '<br /><small>' + prop.district + '</small>';
    }
    
    // City
    //var details = listing.appendChild(document.createElement('div'));
    //details.innerHTML = prop.city;
    
    // Phone
    if (prop.phone) {
      details.innerHTML += ' &middot; ' + prop.phoneFormatted;
    }

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
    locale.on('click', function(e) {
      // 1. center the map on the selected marker.
      map.panTo(locale.getLatLng());

      // 2. Set active the markers associated listing.
      setActive(listing);
    });

    popup += '</div>';
    locale.bindPopup(popup);

    /* 
     * Define the marker
     */
    locale.setIcon(L.icon({
      iconUrl: 'img/marker-condo-alt@2x.png',
      iconSize: [56, 56],
      iconAnchor: [28, 28],
      popupAnchor: [0, -34]
    }));
    
});

