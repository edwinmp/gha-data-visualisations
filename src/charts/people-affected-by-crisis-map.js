/** @jsx jsx */
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import MapFilters from '../components/MapFilters';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  dataBox,
  dataInjectedGeoJson,
  getColor,
  handleClickFeature,
  highlightFeature,
  matchCountryNames,
  processedData,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/map_data_long.csv`;

const renderMap = (
  dimensionVariable,
  mapInstance,
  colorFunction,
  data,
  processed,
  filterOptions,
  legendInstance,
  groupInstance,
  csvData
) => {
  let geojsonLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');
    const piecewiselegendData = [
      { score: 'Not assessed', label: 'No data' },
      { score: 'Very low', label: 'Very low' },
      { score: 'Low', label: 'Low' },
      { score: 'Medium', label: 'Medium' },
      { score: 'High', label: 'High' },
      { score: 'Very high', label: 'Very high' },
    ];
    const legendData = [
      { variable: 'Severity_score', data: piecewiselegendData },
      { variable: 'Climate_vulnerability', data: piecewiselegendData },
      { variable: 'Food_insecure_(millions)', max: '26', min: '0' },
      { variable: 'People_in_need_(millions)', max: '25', min: '0' },
    ];
    const legendColors = ['#77adde', '#5da3d9', '#0089cc', '#0071b1', '#0c457b'];
    const legendContent =
      dimensionVariable !== 'Severity_score' && dimensionVariable !== 'Climate_vulnerability'
        ? `${legendColors
            .map(
              (color) =>
                `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
        </span>`
            )
            .join('')} <p style="margin-left:1px;margin-top: 4px;">${
            legendData.find((items) => items.variable === dimensionVariable).min
          } - ${legendData.find((items) => items.variable === dimensionVariable).max}', millions of people'</p>`
        : legendData
            .find((items) => items.variable === dimensionVariable)
            .data.map(
              (dataItems) =>
                `<span><i style="background:${getColor(dataItems.score)}"></i><label>${dataItems.label}</label></span>`
            )
            .join('');
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);
  const style = (feature) => ({
    fillColor:
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
        mouseover: (e) => highlightFeature(e, dimensionVariable, filterOptions, csvData),
        mouseout: resetHighlight,
        click: (e) => handleClickFeature(e, mapInstance, dataBox, csvData),
      });
    } else {
      layer.on({
        mouseover: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive');
          els.forEach((el) => {
            const elementCopy = el;
            elementCopy.classList += ' grab-cursor-enabled';
          });
        },
        mouseout: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive.grab-cursor-enabled');
          els.forEach((el) => {
            el.classList.remove('grab-cursor-enabled');
          });
        },
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
          window.dataLayer = window.dataLayer || [];
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode, {
            maxZoom: 3,
            minZoom: 1,
            crs: window.L.CRS.EPSG4326,
            center: [6.6, 20.9],
            zoom: 1,
            attributionControl: false,
          });
          const variable = 'Severity_score';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { name: 'Severity_score', label: 'Severity of crisis', scaleType: 'piecewise', unit: '' },
            { name: 'Climate_vulnerability', label: 'Climate vulnerability', scaleType: 'piecewise', unit: '' },
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
          const resetButton = window.L.control({ position: 'bottomleft' });

          const getColorContinous = (d, numberRange) => {
            if (d === 'No data') {
              return '#E6E1E5';
            }
            if (Number(d) > numberRange[1]) {
              return '#0c457b';
            }
            if (Number(d) > numberRange[2]) {
              return '#0071b1';
            }
            if (Number(d) > numberRange[3]) {
              return '#0089cc';
            }
            if (Number(d) > numberRange[4]) {
              return '#5da3d9';
            }
            if (Number(d) >= numberRange[5]) {
              return '#77adde';
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
                    fg,
                    data
                  );
                };

                const onReset = () => {
                  map.setView([6.6, 20.9], 1);
                };

                // Render filter component
                const root = createRoot(filterWrapper);
                root.render(<MapFilters onSelectDimension={onSelectDimension} />);

                // Render reset Button

                resetButton.onAdd = function () {
                  const div = window.L.DomUtil.create('div');
                  const buttonRoot = createRoot(div);
                  buttonRoot.render(<MapResetButton onReset={onReset} />);

                  return div;
                };

                resetButton.addTo(map);

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
                  fg,
                  data
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
