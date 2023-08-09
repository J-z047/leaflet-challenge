const fetch = require('node-fetch');

async function fetchEarthquakeData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status code: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

function processEarthquakeData(geojsonData) {
  const features = geojsonData.features;
  for (const feature of features) {
    const properties = feature.properties;
    const mag = properties.mag;
    const place = properties.place;
    const time = new Date(properties.time);
    const [longitude, latitude, depth] = feature.geometry.coordinates;

    console.log(`Magnitude: ${mag}, Place: ${place}, Time: ${time}, Latitude: ${latitude}, Longitude: ${longitude}, Depth: ${depth}`);
  }
}

const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

fetchEarthquakeData(url)
  .then(geojsonData => processEarthquakeData(geojsonData))
  .catch(error => console.error(error.message));
