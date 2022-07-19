import L from 'leaflet';
import 'leaflet-css';
import fetchCSVData from '../../utils/data';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';
const matchCountryNames = (csvData, worldData) => {
  const matchedData = csvData.map((stream) => {
    const countryObject = worldData.find(
      (feature) => feature.properties.iso_a3 === stream.Country_ID,
    );
    if (countryObject) {
      // eslint-disable-next-line no-param-reassign
      stream.Country_name = countryObject.properties.name;
    }

    return stream;
  });

  return matchedData;
};

const processedData = (countries, processedCountryData) => {
  const data = [];
  // eslint-disable-next-line array-callback-return
  countries.map((country) => {
    const countryData = {};
    countryData.name = country;
    // eslint-disable-next-line array-callback-return
    processedCountryData.map((stream) => {
      if (stream.Country_name === country) {
        countryData[stream.variable] = stream.value;
      }
    });
    data.push(countryData);
  });

  return data;
};

const dataInjectedGeoJson = (jsonData, groupedData) => jsonData.map((feature) => {
  const matchingCountryData = groupedData.find(
    (countryData) => countryData.name === feature.properties.name,
  );
  if (matchingCountryData) {
    // eslint-disable-next-line no-param-reassign
    feature.properties = {
      ...feature.properties,
      ...matchingCountryData,
    };
  }

  return feature;
});

const getColor = (score) => {
  switch (score) {
    case '5':
      return '#7F1850';
    case '4':
      return '#AD1156';
    case '3':
      return '#D64279';
    case '2':
      return '#E4819B';
    case '1':
      return '#F6B9C2';
    default:
      return '#E6E1E5';
  }
};

function renderPeopleAffectedByCrisisLeaflet() {
  const map = L.map('map').setView([14, -0.01], 2);
  const variable = 'Severity_score';
  fetch(MAP_FILE_PATH)
    .then((response) => response.json())
    .then((jsonData) => {
      const geojsonData = jsonData.features;
      fetchCSVData(CSV_PATH).then((data) => {
        const processedCountryNameData = matchCountryNames(data, geojsonData);
        const countries = [
          ...new Set(processedCountryNameData.map((stream) => stream.Country_name)),
        ];
        const groupedData = processedData(countries, processedCountryNameData);

        const style = (feature) => ({
          fillColor: getColor(feature.properties[variable]),
          weight: 1,
          opacity: 1,
          color: 'white',
          fillOpacity: 1,
        });

        L.geoJSON(dataInjectedGeoJson(geojsonData, groupedData), {
          style,
          centre: [14, -0.01],
          zoom: 2,
          maxZoom: 3,
          minZoom: 2,
        }).addTo(map);
      });
    })
    .catch((error) => console.log(error));
}

export default renderPeopleAffectedByCrisisLeaflet;
