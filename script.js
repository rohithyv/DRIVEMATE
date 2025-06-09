const apiKey = "df9faa57c61b4d5eabfe164edfd1face"; // Replace with your valid Geoapify API key
let map;
let userMarker;
let placeMarkers = [];

function initMap(lat, lng) {
  map = L.map("map").setView([lat, lng], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  userMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();
}

function handleLocation(position) {
  const { latitude, longitude } = position.coords;
  initMap(latitude, longitude);
}

function handleError() {
  alert("⚠️ Location access denied or unavailable.");
}

window.onload = () => {
  navigator.geolocation.getCurrentPosition(handleLocation, handleError);
};

const categoryMap = {
  "fuel": "service.vehicle.fuel",
  "catering.restaurant": "catering.restaurant",
  "accommodation.hotel": "accommodation.hotel",
  "healthcare.hospital": "healthcare.hospital",
  "education.school": "education.school"
};

function findNearby() {
  if (!map) return;

  const rawType = document.getElementById("place-type").value;
  const category = categoryMap[rawType] || rawType;
  const center = map.getCenter();

  let radius = 10000; // default 10 km
  if (rawType === "healthcare.hospital" || rawType === "catering.restaurant") {
    radius = 40000; // increase to 40 km
  }

  placeMarkers.forEach(marker => map.removeLayer(marker));
  placeMarkers = [];

  const url = `https://api.geoapify.com/v2/places?categories=${category}&filter=circle:${center.lng},${center.lat},${radius}&bias=proximity:${center.lng},${center.lat}&limit=10&apiKey=${apiKey}`;

  console.log("Fetching from:", url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (!data.features || data.features.length === 0) {
        alert(`❌ No nearby places found within ${radius / 1000} km.`);
        return;
      }

      data.features.forEach(place => {
        const [lng, lat] = place.geometry.coordinates;
        const name = place.properties.name || "Unnamed";
        const address = place.properties.street || place.properties.formatted || "No address";

        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`<strong>${name}</strong><br>${address}`);

        placeMarkers.push(marker);
      });
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      alert("Error fetching nearby places.");
    });
}
