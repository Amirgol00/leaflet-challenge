// Initialize the map on the "map" div with a given center and zoom
var mymap = L.map('map').setView([20.0, 0.0], 2);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(mymap);

// Function to determine marker color based on earthquake depth
function getColor(depth) {
    return depth > 300 ? '#800026' :
           depth > 200  ? '#BD0026' :
           depth > 100  ? '#E31A1C' :
           depth > 50   ? '#FC4E2A' :
           depth > 20   ? '#FD8D3C' :
           depth > 10   ? '#FEB24C' :
                          '#FFEDA0';
}

