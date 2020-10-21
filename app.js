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
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  shadowSize: [100, 95],
});

const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);

//Where is ISS now api fetch data
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude, visibility } = data;

  // adding marker
  marker.setLatLng([latitude, longitude]);

  // set the view of map to current lon/lat
  if (firstTime) {
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
  }

  // change style upon the time
  if (visibility == 'daylight') {
    document.body.style.backgroundColor = '#222';
  } else {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#eee';
  }
  // mainpulate data to the html
  document.querySelector('.lat').textContent = latitude;
  document.querySelector('.lon').textContent = longitude;
}

setInterval(getISS, 1000);
