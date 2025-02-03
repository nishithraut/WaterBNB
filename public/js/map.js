// Ensure coordinates is parsed as an array
const parsedCoordinates = JSON.parse(coordinates);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: parsedCoordinates, // Ensure this is an array [lng, lat]
    zoom: 9
});

console.log(parsedCoordinates); // Check that this logs an array [lng, lat]

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: "red"})
    .setLngLat(parsedCoordinates) // Pass the correct array
    .addTo(map);
