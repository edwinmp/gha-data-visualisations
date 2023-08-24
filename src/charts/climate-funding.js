/** @jsx jsx */
import chroma from 'chroma-js';
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import 'leaflet.pattern';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  dataInjectedGeoJson,
  matchCountryNames,
  processedData,
  getColorDynamic,
  highlightClimateMapFeature,
  crisisGeoJson,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';
import Select from '../components/Select';
import RangeSlider from '../components/RangeSlider';
import CheckboxInput from '../components/CheckboxInput';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#bcd4f0', '#77adde', '#5da3d9', '#0089cc', '#0c457b'];

const getMaxMinValues = (dataType, csvData) => {
  const dataList = csvData
    .filter((d) => d[dataType])
    .map((item) => Number(dataType === 'Total_Climate_Share' ? item[dataType].replace('%', '') : item[dataType]));

  return {
    maxValue: Math.ceil(Math.max(...dataList)),
    minValue: Math.ceil(Math.min(...dataList)) < 10 ? 0 : Math.ceil(Math.min(...dataList)),
  };
};

const getVulnerabilityScale = (data) => {
  const vulnerabilityList = data.map((item) => Number(item.Vulnerability_Score_new));

  return {
    max: Math.ceil(Math.max(...vulnerabilityList)).toString(),
    min: Math.ceil(Math.min(...vulnerabilityList)).toString(),
  };
};

const filterByVulnerability = (data, value) =>
  value === 0 ? data : data.filter((d) => Number(d.Vulnerability_Score_new) >= value);

const getCrisisData = (data, value) => {
  if (!value) return data;

  return data.filter((item) => (value === 'no' ? !item.protracted_crisis : item.protracted_crisis === value));
};

const filterDataByYear = (data, year) => data.filter((item) => item.year === year);

const renderMap = (
  dimensionVariable,
  mapInstance,
  colorFunction,
  data,
  processed,
  filterOptions,
  legendInstance,
  groupInstance,
  csvData,
  crisisData,
  crisisValue
) => {
  let geojsonLayer;
  let crisisLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');

    const scaleData = getMaxMinValues(dimensionVariable, processed);
    const legendContent = `${colors
      .map(
        (color) =>
          `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
        </span>`
      )
      .join('')} <p style="margin-left:1px;margin-top: 4px;">${scaleData.minValue} - ${scaleData.maxValue}${
      dimensionVariable === 'Total_Climate_Share' ? '%' : ',million USD'
    }</p>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const style = (feature) => ({
    fillColor: colorFunction(feature.properties[dimensionVariable], dimensionVariable),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  const crisisStyle = (feature) => ({
    [feature.properties.protracted_crisis && feature.properties[dimensionVariable] ? 'fillPattern' : 'fillColor']:
      feature.properties.protracted_crisis && feature.properties[dimensionVariable]
        ? new window.L.StripePattern({
            weight: 2,
            spaceWeight: 1,
            angle: 45,
            color: '#fff',
          }).addTo(mapInstance)
        : '#00000000',
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
        mouseover: (e) => highlightClimateMapFeature(e, dimensionVariable, filterOptions, csvData),
        mouseout: resetHighlight,
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
    crisisLayer = window.L.geoJSON(crisisGeoJson(dataInjectedGeoJson(data, processed), crisisData, crisisValue), {
      style: crisisStyle,
      onEachFeature,
    });
    groupInstance.addLayer(geojsonLayer);
    if (crisisValue) {
      groupInstance.addLayer(crisisLayer);
    }
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
          let year = '2017';
          let vulnerability = 0;

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
                const processedCountryNameData = matchCountryNames(data, geojsonData, 'iso3', 'countryname');
                let yearlyProcessedCountryNameData = processedCountryNameData.filter((item) => item.year === year);
                const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.countryname)));
                let groupedData = processedData(
                  countries,
                  yearlyProcessedCountryNameData,
                  'countryname',
                  'value_precise'
                );
                let finalFilteredData = filterByVulnerability(groupedData, vulnerability);
                let crisisCountries = [];
                let crisisValue;

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

                // Render default map
                renderMap(
                  variable,
                  map,
                  getColorContinous,
                  geojsonData,
                  finalFilteredData,
                  filterOptionMapping,
                  legend,
                  fg,
                  data,
                  crisisCountries,
                  crisisValue
                );

                const onSelectDimension = (dimension) => {
                  variable = dimension.value ? dimension.value : variable;

                  renderMap(
                    variable,
                    map,
                    getColorContinous,
                    geojsonData,
                    finalFilteredData,
                    filterOptionMapping,
                    legend,
                    fg,
                    data,
                    crisisCountries,
                    crisisValue
                  );
                };

                const onSelectYear = (value) => {
                  year = value || year;
                  yearlyProcessedCountryNameData = filterDataByYear(processedCountryNameData, year);
                  groupedData = processedData(
                    countries,
                    yearlyProcessedCountryNameData,
                    'countryname',
                    'value_precise'
                  );
                  finalFilteredData = filterByVulnerability(groupedData, vulnerability);
                  renderMap(
                    variable,
                    map,
                    getColorContinous,
                    geojsonData,
                    finalFilteredData,
                    filterOptionMapping,
                    legend,
                    fg,
                    data,
                    crisisCountries,
                    crisisValue
                  );
                };

                const onSelectVulnerability = (value) => {
                  vulnerability = Number(value);
                  finalFilteredData = filterByVulnerability(groupedData, vulnerability);
                  renderMap(
                    variable,
                    map,
                    getColorContinous,
                    geojsonData,
                    finalFilteredData,
                    filterOptionMapping,
                    legend,
                    fg,
                    data,
                    crisisCountries,
                    crisisValue
                  );
                };

                const onCrisisChange = (value) => {
                  crisisValue = value;
                  const crisisData = getCrisisData(filterDataByYear(processedCountryNameData, year), value);
                  crisisCountries = Array.from(new Set(crisisData.map((stream) => stream.countryname)));
                  renderMap(
                    variable,
                    map,
                    getColorContinous,
                    geojsonData,
                    finalFilteredData,
                    filterOptionMapping,
                    legend,
                    fg,
                    data,
                    crisisCountries,
                    crisisValue
                  );
                };

                const onReset = () => {
                  map.setView([6.6, 20.9], 1);
                };

                // Render filter component
                const root = createRoot(filterWrapper);
                root.render(
                  <div>
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
                    <RangeSlider
                      label="Select a year"
                      min="2017"
                      max="2021"
                      step={1}
                      onChange={onSelectYear}
                      dataList={['2017', '2018', '2019', '2020', '2021']}
                      name="years"
                    />
                    <RangeSlider
                      label="Select vulnerability index"
                      min="0"
                      max={getVulnerabilityScale(groupedData).max}
                      step={1}
                      onChange={onSelectVulnerability}
                      dataList={[0, getVulnerabilityScale(groupedData).max]}
                      name={'vulnerability'}
                    />
                    <CheckboxInput name="crisis" label="Select crisis" onChange={onCrisisChange} />
                  </div>
                );

                // Render reset Button

                resetButton.onAdd = function () {
                  const div = window.L.DomUtil.create('div');
                  const buttonRoot = createRoot(div);
                  buttonRoot.render(<MapResetButton onReset={onReset} />);

                  return div;
                };

                resetButton.addTo(map);

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
