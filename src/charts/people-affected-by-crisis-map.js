import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  highlightFeature,
  matchCountryNames,
  processedData,
  dataInjectedGeoJson,
  getColor,
  onLegendAdd,
  handleClickFeature,
  dataBox,
} from '../utils/interactiveMap';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode).setView([20, -0.09], 2);
          const variable = 'Severity_score';
          let geojsonLayer;

          // Legend
          const legend = window.L.control({ position: 'topright' });
          legend.onAdd = onLegendAdd;
          legend.addTo(map);

          dichart.showLoading();

          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const geojsonData = jsonData.features;
              fetchCSVData(CSV_PATH).then((data) => {
                const processedCountryNameData = matchCountryNames(data, geojsonData);
                const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.Country_name)));
                const groupedData = processedData(countries, processedCountryNameData);

                const style = (feature) => ({
                  fillColor: getColor(feature.properties[variable]),
                  weight: 1,
                  opacity: 1,
                  color: 'white',
                  fillOpacity: 1,
                });

                const resetHighlight = (e) => {
                  geojsonLayer.resetStyle(e.target);
                  e.target.closePopup();
                };

                const onEachFeature = (feature, layer) => {
                  if (feature.properties[variable] || feature.properties[variable] === '') {
                    layer.on({
                      mouseover: (e) => highlightFeature(e, variable),
                      mouseout: resetHighlight,
                      click: (e) => handleClickFeature(e, map, dataBox),
                    });
                  }
                };

                // Add geojson layer to the map
                geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(geojsonData, groupedData), {
                  style,
                  onEachFeature,
                  maxZoom: 3,
                  minZoom: 2,
                }).addTo(map);
                dichart.hideLoading();
              });
            })
            .catch((error) => console.log(error));
        });
      },
    },
  });
}

export default renderPeopleAffectedByCrisisLeaflet;
