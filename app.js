// leaflet map config
const mymap = L.map('issMap').setView([0, 0], 1);
const marker = L.marker([0, 0]).addTo(mymap);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">osm</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);

//Where is ISS now api fetch data
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
getISS();
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
