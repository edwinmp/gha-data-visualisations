import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import closeIcon from '../../public/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg';
import {
  dataBoxContent,
  highlightFeature,
  matchCountryNames,
  processedData,
  dataInjectedGeoJson,
  getColor,
} from '../utils/interactiveMap';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

const onLegendAdd = () => {
  const div = window.L.DomUtil.create('div', 'legend');
  const legendData = [
    { score: '5', label: '5 - Very High' },
    { score: '4', label: '4 - High' },
    { score: '3', label: '3 - Medium' },
    { score: '2', label: '2 - Low' },
    { score: '1', label: '1 - Very Low' },
    { score: '', label: 'Not assessed' },
  ];

  const legendContent = legendData
    .map((data) => `<span><i style="background:${getColor(data.score)}"></i><label>${data.label}</label></span>`)
    .join('');
  div.innerHTML = legendContent;

  return div;
};

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

          // data box
          const dataBox = window.L.control({ position: 'bottomright' });
          dataBox.onAdd = function () {
            this.div = window.L.DomUtil.create('div', 'databox'); // create a div with a class "databox"
            this.update();

            return this.div;
          };

          function onClose(e) {
            e.stopPropagation();
            dataBox.update();
          }

          dataBox.update = function (props) {
            this.div.innerHTML = props
              ? `<div>${
                  props.name
                } <button id=closeDatabox><img src=${closeIcon} height=20 width=20 ></img></button></div> <br> ${dataBoxContent(
                  props
                )
                  .map(
                    (item) =>
                      `<span><img src=${item.icon} height=20 width=20 ></img><p>${item.label}: ${item.value}</p> </span>`
                  )
                  .join('')}`
              : '';
            const closeButton = document.getElementById('closeDatabox');
            if (closeButton) {
              closeButton.addEventListener('click', (e) => onClose(e));
            }
          };

          const handleClick = (e) => {
            dataBox.addTo(map);
            const layer = e.target;
            dataBox.update(layer.feature.properties);
          };

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
                      click: handleClick,
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
