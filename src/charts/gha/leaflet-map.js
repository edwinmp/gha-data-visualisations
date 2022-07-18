// import fetchCSVData from '../../utils/data';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
// const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';

const renderPeopleAffectedByCrisisLeaflet = () => {
  const map = window.L.map('map').setView([14, -0.01], 2);
  fetch(MAP_FILE_PATH)
    .then((response) => response.json())
    .then((data) => {
      const geojsonData = data.features;
      window.L.geoJSON(geojsonData).addTo(map);
    })
    .catch((error) => console.log(error));
};

export default renderPeopleAffectedByCrisisLeaflet;
