import 'leaflet.pattern';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  highlightFeature,
  matchCountryNames,
  processedData,
  dataInjectedGeoJson,
  getLegendColor,
  handleClickFeature,
  dataBox,
} from '../utils/interactiveMap';
import { addFilter, addFilterWrapper } from '../widgets/filters';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

const renderMap = (dimensionVariable, mapInstance, colorFunction, data, processed, filterOptions, legendInstance) => {
  let geojsonLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');
    const piecewiselegendData = [
      { score: '5', label: '5 - Very High' },
      { score: '4', label: '4 - High' },
      { score: '3', label: '3 - Medium' },
      { score: '2', label: '2 - Low' },
      { score: '1', label: '1 - Very Low' },
      { score: '', label: 'Not assessed' },
    ];
    const legendData = [
      { variable: 'Severity_score', data: piecewiselegendData },
      { variable: 'Climate_vulnerability', data: piecewiselegendData },
      { variable: 'COVID_vaccination_rate', max: 100 },
      { variable: 'Food_insecure_(millions)', max: 26 },
      { variable: 'People_in_need_(millions)', max: 25 },
    ];

    const legendColors = ['#7F1850', '#AD1156', '#D64279', '#E4819B', '#F6B9C2'];

    const legendContent =
      dimensionVariable !== 'Severity_score' && dimensionVariable !== 'Climate_vulnerability'
        ? `${legendData.find((items) => items.variable === dimensionVariable).max}${legendColors
            .map(
              (color) =>
                `<span>
          <i style="background:${color}"></i>
        </span>`
            )
            .join('')}0`
        : legendData
            .find((items) => items.variable === dimensionVariable)
            .data.map(
              (dataItems) =>
                `<span><i style="background:${getLegendColor(dataItems.score)}"></i><label>${
                  dataItems.label
                }</label></span>`
            )
            .join('');
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);
  const style = (feature) => ({
    [feature.properties[dimensionVariable] === '' ? 'fillPattern' : 'fillColor']: colorFunction(
      feature.properties[dimensionVariable]
    ),
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
    if (feature.properties[dimensionVariable] || feature.properties[dimensionVariable] === '') {
      layer.on({
        mouseover: (e) => highlightFeature(e, dimensionVariable, filterOptions),
        mouseout: resetHighlight,
        click: (e) => handleClickFeature(e, mapInstance, dataBox),
      });
    }
  };

  // Add geojson layer to the map

  geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
    style,
    onEachFeature,
    maxZoom: 3,
    minZoom: 2,
  }).addTo(mapInstance);
};

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode).setView([20, -0.09], 2);
          let variable = 'Severity_score';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { name: 'Severity_score', label: 'Severity score', scaleType: 'piecewise' },
            { name: 'Climate_vulnerability', label: 'Climate vulnerability score', scaleType: 'piecewise' },
            { name: 'COVID_vaccination_rate', label: 'COVID vaccinattion rate', scaleType: 'continous' },
            { name: 'Food_insecure_(millions)', label: 'People facing food insecurity', scaleType: 'continous' },
            { name: 'People_in_need_(millions)', label: 'People in need', scaleType: 'continous' },
          ];

          const dimensionFilter = addFilter({
            wrapper: filterWrapper,
            options: filterOptions.map((d) => d.label),
            defaultOption: 'Severity score',
            className: 'map-filter',
            label: 'Select a dimension',
          });

          // Legend
          const legend = window.L.control({ position: 'topright' });

          const stripes = new window.L.StripePattern({ weight: 2, spaceWeight: 1, angle: 45, color: 'grey' });
          stripes.addTo(map);

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
              case '':
                return stripes;
              default:
                return '#E6E1E5';
            }
          };

          const getColorContinous = (d) => {
            if (Number(d) > 80) {
              return '#800026';
            }
            if (Number(d) > 60) {
              return '#BD0026';
            }
            if (Number(d) > 40) {
              return '#E31A1C';
            }
            if (Number(d) > 20) {
              return '#FC4E2A';
            }
            if (Number(d) > 0) {
              return '#FD8D3C';
            }
            if (d === '') {
              return stripes;
            }

            return '#E6E1E5';
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

                dimensionFilter.addEventListener('change', (event) => {
                  variable = filterOptions.find((option) => option.label === event.target.value).name;

                  renderMap(
                    variable,
                    map,
                    filterOptions.find((option) => option.name === variable).scaleType === 'continous'
                      ? getColorContinous
                      : getColor,
                    geojsonData,
                    groupedData,
                    filterOptions,
                    legend
                  );
                });
                renderMap(
                  variable,
                  map,
                  variable !== 'Severity_score' ? getColorContinous : getColor,
                  geojsonData,
                  groupedData,
                  filterOptions,
                  legend
                );
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
