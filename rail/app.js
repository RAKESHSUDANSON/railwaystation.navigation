// Initialize the map centered on Tirunelveli Railway Station
var map = L.map('map').setView([8.7167, 77.7167], 15); // Adjust this center to your station's coordinates

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Dictionary of station places with their coordinates
var locations = {
    "Platform 1": [8.7180, 77.7170],
    "Platform 2": [8.7185, 77.7180],
    "Shops": [8.7190, 77.7190],
    "Ticket Counter": [8.7175, 77.7175],
    "Water Area": [8.7182, 77.7165],
    "Seating Area": [8.7172, 77.7178],
    "Clock": [8.7178, 77.7182],
    "Steps": [8.7188, 77.7172],
    "Maps": [8.7183, 77.7185],
    "Tirunelveli Railway Station": [8.7167, 77.7167]  // Center of the station
};

// Place markers for all locations inside the station
for (const place in locations) {
    L.marker(locations[place]).addTo(map)
        .bindPopup(`<b>${place}</b>`)
        .openPopup();
}

// Variable to store the routing control, used to remove any previous routes
var route;

// Function to navigate between selected 'From' and 'To' locations
function navigate() {
    // Get the values selected by the user from the input fields
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;

    // Check if both 'From' and 'To' locations are provided
    if (!from || !to) {
        alert("Please select both 'From' and 'To' locations.");
        return;
    }

    // Check if the selected locations are valid
    if (!locations[from] || !locations[to]) {
        alert("Invalid location selected. Please choose from the list.");
        return;
    }

    // Get the coordinates of the 'From' and 'To' locations
    var fromCoords = locations[from];
    var toCoords = locations[to];

    // If a route already exists, remove it
    if (route) {
        map.removeControl(route);
    }

    // Create a new route from 'From' to 'To' using the Leaflet Routing Machine
    route = L.Routing.control({
        waypoints: [
            L.latLng(fromCoords),
            L.latLng(toCoords)
        ],
        routeWhileDragging: true  // Allows route to be adjusted by dragging
    }).addTo(map);

    // Adjust the map view to fit the bounds of the route
    map.fitBounds(route.getBounds());
}

// Optional: Add a way to update the available places dynamically (if needed)
function updatePlaceOptions() {
    var placesList = Object.keys(locations);
    var fromInput = document.getElementById('from');
    var toInput = document.getElementById('to');

    // Clear existing options in the input fields
    fromInput.innerHTML = '';
    toInput.innerHTML = '';

    // Add the new options
    placesList.forEach(function(place) {
        var optionFrom = document.createElement('option');
        optionFrom.value = place;
        fromInput.appendChild(optionFrom);

        var optionTo = document.createElement('option');
        optionTo.value = place;
        toInput.appendChild(optionTo);
    });
}

// Run this function to initialize the available places in the input fields
updatePlaceOptions();
