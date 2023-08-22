/** @jsx jsx */
import chroma from 'chroma-js';
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  dataInjectedGeoJson,
  getColor,
  matchCountryNames,
  processedData,
  getColorDynamic,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';
import ChartFilters from '../components/ChartFilters';
import Select from '../components/Select';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];
const getMaxMinValues = (dataType, csvData) => {
  const dataList = csvData.map((item) =>
    Number(dataType === 'Total_Climate_Share' ? item[dataType].replace('%', '') : item[dataType])
  );

  return {
    maxValue: Math.ceil(Math.max(...dataList)),
    minValue: Math.ceil(Math.min(...dataList)) < 10 ? 0 : Math.ceil(Math.min(...dataList)),
  };
};

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

  const style = (feature) => ({
    fillColor: colorFunction(feature.properties[dimensionVariable], dimensionVariable),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  // const resetHighlight = (e) => {
  //   geojsonLayer.resetStyle(e.target);
  //   e.target.closePopup();
  // };

  // const onEachFeature = (feature, layer) => {};

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
      style,
      // onEachFeature,
    });
    groupInstance.addLayer(geojsonLayer);
  }
  loadLayer();
};

function renderClimateFundingMap() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-climate-funding',
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
          let variable = 'Total_Climate_Share';
          const year = '2021';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { value: 'Total_Climate_Share', label: 'Percentage share' },
            { value: 'Total_Climate_USD', label: 'USD millions' },
          ];
          const filterOptionMapping = [
            {
              name: 'Total_Climate_USD',
              label: 'USD millions',
              scaleType: 'continous',
              unit: 'million',
            },
            {
              name: 'Total_Climate_Share',
              label: 'Percentage share',
              scaleType: 'continous',
              unit: '%',
            },
          ];

          // Legend
          const legend = window.L.control({ position: 'topright' });
          const resetButton = window.L.control({ position: 'bottomleft' });

          dichart.showLoading();
          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const geojsonData = jsonData.features;
              fetchCSVData(DATA_URL).then((data) => {
                const processedCountryNameData = matchCountryNames(data, geojsonData);
                const yearlyProcessedCountryNameData = processedCountryNameData.filter((item) => item.year === year);
                const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.countryname)));
                const groupedData = processedData(
                  countries,
                  yearlyProcessedCountryNameData,
                  'countryname',
                  'value_precise'
                );
                console.log(groupedData);

                const fg = window.L.featureGroup().addTo(map);

                const getColorContinous = (d, dimensionVariable) => {
                  const scaleData = getMaxMinValues(dimensionVariable, groupedData);
                  const increment = (scaleData.maxValue - scaleData.minValue) / colors.length;

                  if (!d) {
                    return '#E6E1E5';
                  }

                  return getColorDynamic(
                    dimensionVariable === 'Total_Climate_Share' ? d.replace('%', '') : d,
                    scaleData.minValue,
                    scaleData.maxValue,
                    increment,
                    chroma,
                    colors
                  );
                };

                const onSelectDimension = (dimension) => {
                  variable = dimension.value ? dimension.value : variable;

                  renderMap(
                    variable,
                    map,
                    filterOptionMapping.find((option) => option.name === variable).scaleType === 'continous'
                      ? getColorContinous
                      : getColor,
                    geojsonData,
                    groupedData,
                    filterOptionMapping,
                    legend,
                    fg
                  );
                };

                const onReset = () => {
                  map.setView([6.6, 20.9], 1);
                };

                // Render filter component
                const root = createRoot(filterWrapper);
                root.render(
                  <ChartFilters>
                    <Select
                      classNamePrefix="climate-chart-select"
                      label="Select value type"
                      options={filterOptions}
                      defaultValue={[{ value: 'Total_Climate_Share', label: 'Percentage share' }]}
                      onChange={onSelectDimension}
                      css={{
                        minWidth: '150px',
                      }}
                    />
                  </ChartFilters>
                );

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
                  filterOptionMapping.find((option) => option.name === variable).scaleType === 'continous'
                    ? getColorContinous
                    : getColor,
                  geojsonData,
                  groupedData,
                  filterOptionMapping,
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

export default renderClimateFundingMap;
