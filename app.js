// leaflet map config
const mymap = L.map('issMap').setView([0, 0], 1);
// config tiles
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">osm</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);

// config icon and marker
const myIcon = L.icon({
  iconUrl: 'iss.png',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

//Where is ISS now api fetch data
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  // adding marker
  marker.setLatLng([latitude, longitude]);
  // console.log(latitude, longitude);

  // mainpulate data to the html
  document.querySelector('.lat').textContent = latitude;
  document.querySelector('.lon').textContent = longitude;
}

getISS();
