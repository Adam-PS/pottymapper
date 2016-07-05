L.mapbox.accessToken = 'pk.eyJ1IjoiYWRhbXBzIiwiYSI6ImNpcTJmNHR2ODAwNW14bG00MWZ3MW4ydmkifQ.KF6MkiVY6tPogX0HJHhUKg';
var map = L.mapbox.map('map', 'adamps.0hlh0oli').setView([39.945, -75.162], 15);
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
            map.setView([39.945, -75.162], 15);
        });

        return container;
    }
});
map.addControl(new resetViewControl());

var layers = {
    Streets: L.mapbox.tileLayer('mapbox.streets'),
    Satellite: L.mapbox.tileLayer('mapbox.streets-satellite'),
    HighContrast: L.mapbox.tileLayer('mapbox.high-contrast')
};
layers.Streets.addTo(map);
L.control.layers(layers).addTo(map);

var geoJson  = [
    {
        "type": "FeatureCollection",
        "features":[
            { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [-75.164399, 39.95413]},
              "properties": {"title": "Jawnadelphia",
                             "description": "Life, Liberty, and the pursuit of Jawns.",
                             "marker-size": "large",
                             "marker-color": "#ffefd5",
                             "marker-symbol": "star",
                            }
            },
            { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [-75.176122, 39.954277]},
              "properties": {"title": "Trader Jawns",
                             "description": "Cheap organic jawns.",
                             "marker-size": "large",
                             "marker-color": "#ffefd5"
                            }
            },
            { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [ -75.145696, 39.933569]},
              "properties": {"title": "South Philly Jawns",
                             "description": "Commercial jawns.",
                             "marker-size": "large",
                             "marker-color": "#ffefd5"
                            }
            },
            { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [  -75.153859, 39.939798]},
              "properties": {"title": "Jawnton Abbey",
                             "description": "My jawn.",
                             "marker-size": "large",
                             "marker-color": "#ffefd5"
                            }
            }
        ]}];

var myJawns = L.mapbox.featureLayer(geoJson).addTo(map);

myJawns.on('ready', function() {
    map.fitBounds(myJawns.getBounds());
});

myJawns.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});
