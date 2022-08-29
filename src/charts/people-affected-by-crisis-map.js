/** @jsx jsx */
import 'leaflet.pattern';
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import MapFilters from '../components/MapFilters';
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
import { addFilterWrapper } from '../widgets/filters';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

const renderMap = (
  dimensionVariable,
  mapInstance,
  colorFunction,
  data,
  processed,
  filterOptions,
  legendInstance,
  groupInstance
) => {
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
      { variable: 'COVID_vaccination_rate', max: '100(%)' },
      { variable: 'Food_insecure_(millions)', max: '26(million)' },
      { variable: 'People_in_need_(millions)', max: '25(million)' },
    ];

    const legendColors = ['#F6B9C2', '#E4819B', '#D64279', '#AD1156', '#7F1850'];

    const legendContent =
      dimensionVariable !== 'Severity_score' && dimensionVariable !== 'Climate_vulnerability'
        ? `<p style="margin-right:1px;margin-top:5px;">0<p>${legendColors
            .map(
              (color) =>
                `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
        </span>`
            )
            .join('')} <p style="margin-left:1px;margin-top:5px;">${
            legendData.find((items) => items.variable === dimensionVariable).max
          }</p>`
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
    [feature.properties[dimensionVariable] === '' ? 'fillPattern' : 'fillColor']:
      filterOptions.find((opts) => opts.name === dimensionVariable).scaleType === 'piecewise'
        ? colorFunction(feature.properties[dimensionVariable])
        : colorFunction(
            feature.properties[dimensionVariable],
            filterOptions.find((opts) => opts.name === dimensionVariable).values
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

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
      style,
      onEachFeature,
    });
    groupInstance.addLayer(geojsonLayer);
  }
  loadLayer();
};

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode, {
            maxZoom: 3,
            minZoom: 1,
            crs: window.L.CRS.EPSG4326,
            center: [0, 0],
            zoom: 1,
          });
          const variable = 'Severity_score';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { name: 'Severity_score', label: 'Severity of crisis', scaleType: 'piecewise', unit: '' },
            { name: 'Climate_vulnerability', label: 'Climate vulnerability', scaleType: 'piecewise', unit: '' },
            {
              name: 'COVID_vaccination_rate',
              label: 'Covid-19 vaccination rate',
              scaleType: 'continous',
              values: [100, 80, 60, 40, 20, 0],
              unit: '%',
            },
            {
              name: 'Food_insecure_(millions)',
              label: 'Food insecurity',
              scaleType: 'continous',
              values: [26, 21, 16, 11, 6, 0],
              unit: 'million',
            },
            {
              name: 'People_in_need_(millions)',
              label: 'People in need',
              scaleType: 'continous',
              values: [25, 20, 15, 10, 5, 0],
              unit: 'million',
            },
          ];

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

          const getColorContinous = (d, numberRange) => {
            if (d === '') {
              return stripes;
            }
            if (Number(d) > numberRange[1]) {
              return '#7F1850';
            }
            if (Number(d) > numberRange[2]) {
              return '#AD1156';
            }
            if (Number(d) > numberRange[3]) {
              return '#D64279';
            }
            if (Number(d) > numberRange[4]) {
              return '#E4819B';
            }
            if (Number(d) >= numberRange[5]) {
              return '#F6B9C2';
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
                const fg = window.L.featureGroup().addTo(map);

                const onSelectDimension = (dimension) => {
                  renderMap(
                    dimension,
                    map,
                    filterOptions.find((option) => option.name === dimension).scaleType === 'continous'
                      ? getColorContinous
                      : getColor,
                    geojsonData,
                    groupedData,
                    filterOptions,
                    legend,
                    fg
                  );
                };
                const root = createRoot(filterWrapper);
                root.render(<MapFilters onSelectDimension={onSelectDimension} />);

                renderMap(
                  variable,
                  map,
                  filterOptions.find((option) => option.name === variable).scaleType === 'continous'
                    ? getColorContinous
                    : getColor,
                  geojsonData,
                  groupedData,
                  filterOptions,
                  legend,
                  fg
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
