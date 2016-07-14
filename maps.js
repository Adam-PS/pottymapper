L.mapbox.accessToken = 'pk.eyJ1IjoiYWRhbXBzIiwiYSI6ImNpcTJmNHR2ODAwNW14bG00MWZ3MW4ydmkifQ.KF6MkiVY6tPogX0HJHhUKg';
var map = L.mapbox.map('map', 'adamps.0hlh0oli').setView([39.945, -75.162], 13);

var layers = {
    Streets: L.mapbox.tileLayer('mapbox.streets'),
    Satellite: L.mapbox.tileLayer('mapbox.streets-satellite'),
    HighContrast: L.mapbox.tileLayer('mapbox.high-contrast')
};
layers.Streets.addTo(map);
L.control.layers(layers).addTo(map);

var resetViewControl = L.Control.extend({
    options: {position : 'topleft'},
    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'reset-control-Container leaflet-bar leaflet-control');
        var resetControl = L.DomUtil.create('a', 'reset-control');
        resetControl.setAttribute('href', '#');
        resetControl.setAttribute('title', 're-center map');
        resetControl.innerHTML = '&#9733';
        container.appendChild(resetControl);

        resetControl.addEventListener('click', function(e){
            L.DomEvent.preventDefault(e);
            L.DomEvent.stopPropagation(e);
            map.setView([39.945, -75.162], 13);
        });

        return container;
    }
});
map.addControl(new resetViewControl());

var geojson = [
    { "type": "FeatureCollection",
      "features": [
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.164399, 39.95413]},
            "properties": {
                           "title": "Jawnadelphia",
                           "description": "Life, Liberty, and the pursuit of Jawns.",
                           "bathroomtype": "unisex",
                           "changingtable": false,
                           "comments": "Lots of steps."
                          }
          },
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.176122, 39.954277]},
            "properties": {
                           "title": "Trader Jawns",
                           "description": "Cheap organic jawns.",
                           "bathroomtype": "women",
                           "changingtable": true
                          }
          },
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.145696, 39.933569]},
            "properties": {
                           "title": "South Philly Jawns",
                           "bathroomtype": "none",
                           "changingtable": false,
                           "comments": "avoid at all costs."
                          }
          },
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.1560112, 39.9411733]},
            "properties": {
                           "title": "Rally Jawn",
                           "description": "A coffee jawn.",
                           "bathroomtype": "unisex",
                           "changingtable": true,
                           "comments": "enter w/ stroller through back door."
                          }
          },
          { "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [-75.153859, 39.939798]},
            "properties": {
                           "title": "Jawnton Abbey",
                           "description": "My jawn.",
                           "bathroomtype": "unisex",
                           "changingtable": false,
                           "comments": "mi casa su casa."
                          }
          }
      ]
    }
];

var listings = document.getElementById('listings');
var locations = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(map);
    map.fitBounds(locations.getBounds());

    locations.eachLayer(function(marker) {
        var props = marker.feature.properties;
        var popupContent =
            '<h3>' + props.title + '</h3><div><ul><li>' + props.bathroomtype +
            '</li><li>'+ props.changingtable + '</li>';

        var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';

        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.innerHTML = props.title;

        if (props.description) {
            link.innerHTML += ' <br /><small>' + props.description + '</small>';
            popupContent += '<li>' + props.description + '</li>';
        }

        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = props.bathroomtype + props.changingtable;

        if (props.comments) {
            details.innerHTML += ' &middot; ' + props.comments;
        }

        var prevListing;
        var toggleActive = function(el) {
            prevListing.classList.remove('active');
            el.classList.add('active');
            prevListing = el;
        };

        var activateMarker = function(e) {
            //L.DomEvent.preventDefault(e);
            //L.DomEvent.stopPropagation(e);
            //toggleActive(listing);
            map.setView(marker.getLatLng(), 16);
            marker.openPopup();
        };

        var activateListing = function() {
            map.panTo(marker.getLatLng());
            //toggleActive(listing);
        };

        link.addEventListener('click', activateMarker);
        link.addEventListener('touchend', activateMarker);

        marker.addEventListener('click', activateListing());
        marker.addEventListener('touchend', activateListing());

        popupContent += '</ul></div>';
        marker.bindPopup(popupContent);
    });
