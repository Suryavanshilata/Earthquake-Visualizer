// Initialize the map centered on the world
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to get color based on magnitude
function getColor(mag) {
  return mag > 5 ? '#d73027' :
         mag > 4 ? '#fc8d59' :
         mag > 3 ? '#fee08b' :
         mag > 2 ? '#d9ef8b' :
         mag > 1 ? '#91cf60' :
                   '#1a9850';
}

// Fetch earthquake data from USGS (past day, all magnitudes)
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
  .then(response => response.json())
  .then(data => {
    data.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const mag = feature.properties.mag;
      const place = feature.properties.place;

      if (mag) {
        // Create a circle marker
        L.circleMarker([coords[1], coords[0]], {
          radius: mag * 3,
          fillColor: getColor(mag),
          color: '#000',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        })
        .bindPopup(`<strong>Location:</strong> ${place}<br><strong>Magnitude:</strong> ${mag}`)
        .addTo(map);
      }
    });
  })
  .catch(err => console.error('Error fetching earthquake data:', err));