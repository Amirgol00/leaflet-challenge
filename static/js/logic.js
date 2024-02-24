// Initialize the map on the "map" div with a given center and zoom
var mymap = L.map('map').setView([20.0, 0.0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(mymap);

// Function to determine marker color based on earthquake depth (gradient of red to yellow)
function getColor(depth) {
    return depth > 300 ? '#800026' :
           depth > 200  ? '#BD0026' :
           depth > 100  ? '#E31A1C' :
           depth > 50   ? '#FC4E2A' :
           depth > 20   ? '#FD8D3C' :
           depth > 10   ? '#FEB24C' :
                          '#FFEDA0';
}

// Fetching GeoJSON data
fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
.then(response => response.json())
.then(data => {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            var magnitude = feature.properties.mag;
            var depth = feature.geometry.coordinates[2];
            return L.circleMarker(latlng, {
                radius: magnitude * 5, // Size of the marker based on magnitude
                fillColor: getColor(depth), // Color of the marker based on depth
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties && feature.properties.place) {
                // Popup that shows additional information
                layer.bindPopup(`Location: ${feature.properties.place}<br>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km`);
            }
        }
    }).addTo(mymap);
});

// Add a legend to the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 300], // Depth ranges for the legend
        labels = [];

    // Looping through intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '; width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' km<br>' : '+ km');
    }

    return div;
};

// Adding the legend to the map
legend.addTo(mymap);