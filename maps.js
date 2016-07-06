L.mapbox.accessToken = 'pk.eyJ1IjoiYWRhbXBzIiwiYSI6ImNpcTJmNHR2ODAwNW14bG00MWZ3MW4ydmkifQ.KF6MkiVY6tPogX0HJHhUKg';
var map = L.mapbox.map('map', 'adamps.0hlh0oli').setView([39.945, -75.162], 17);
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

var myJawns = L.mapbox.featureLayer().loadURL('./data/features.geojson').addTo(map);

myJawns.on('ready', function() {
    map.fitBounds(myJawns.getBounds());
});

myJawns.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature,
        props = feature.properties;
    var popupContent = document.createElement('div');

    for (var key in props) {
        if (props.hasOwnProperty(key) && (key != 'marker-size' || 'marker-color')) {
            var popupContentDiv = document.createElement('div');
            popupContentDiv.innerHTML = key + ' : ' + props[key];
            popupContent.appendChild(popupContentDiv);
        }
    }

    marker.bindPopup(popupContent,{
        closeButton: false
    });
});

myJawns.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});
