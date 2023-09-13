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
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';
import Select from '../components/Select';
import RangeSlider from '../components/RangeSlider';
import CheckboxInput from '../components/CheckboxInput';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#bcd4f0', '#77adde', '#5da3d9', '#0089cc', '#0c457b'];
const vulnerabilityMapping = [
  { label: 4, value: 60, text: 'Very high' },
  { label: 3, value: 55, text: 'High', min: 50, max: 55 },
  { label: 2, value: 50, text: 'Medium', min: 40, max: 50 },
  { label: 1, value: 40, text: 'Low', min: 0, max: 40 },
  { label: 0, value: 0, text: 'Very low' },
];

const getMaxMinValues = (dataType, csvData) => {
  const dataList = csvData
    .filter((d) => d[dataType])
    .map((item) =>
      Number(
        dataType === 'Total_Climate_Share' || dataType === 'CCA_Share' || dataType === 'CCM_Share'
          ? item[dataType].replace('%', '')
          : item[dataType]
      )
    );

  return {
    maxValue: Math.ceil(Math.max(...dataList)),
    minValue: Math.ceil(Math.min(...dataList)) < 10 ? 0 : Math.ceil(Math.min(...dataList)),
  };
};

const getLegendValues = (minValue, maxValue, colorLength) => {
  const items = [];
  const increment = maxValue / colorLength;
  let initialValue = minValue;
  while (items.length <= colorLength) {
    if (initialValue === minValue) {
      items.push(initialValue);
    }

    initialValue += increment;
    if (Number(initialValue) === initialValue && initialValue % 1 !== 0) {
      items.push(Number(initialValue.toFixed(1)));
    } else {
      items.push(initialValue);
    }
  }

  return items;
};

const filterByVulnerability = (data, value) => {
  if (value === 0) {
    return data;
  }

  const mappingData = vulnerabilityMapping.find((item) => item.value === value);

  return mappingData.value === 60
    ? data.filter((d) => d.Vulnerability_Score_new >= 60)
    : data.filter((d) => d.Vulnerability_Score_new < mappingData.max && d.Vulnerability_Score_new >= mappingData.min);
};

const getCrisisData = (data, value) => {
  if (!value) return data;

  return data.filter((item) => item.protracted_crisis === value);
};

const filterDataByYear = (data, year) => data.filter((item) => item.year === year);

const getAdaptationActualValue = (selected, dimension) => {
  if (selected === 'CCA' && dimension === 'Total_Climate_USD') {
    return 'CCA_USD';
  }
  if (selected === 'CCA' && dimension === 'Total_Climate_Share') {
    return 'CCA_Share';
  }
  if (selected === 'CCM' && dimension === 'Total_Climate_Share') {
    return 'CCM_Share';
  }
  if (selected === 'CCM' && dimension === 'Total_Climate_USD') {
    return 'CCM_USD';
  }

  return dimension;
};

const getVulnerabilityValue = (selectedValue) =>
  vulnerabilityMapping.find((item) => item.label === selectedValue).value;

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
  crisisValue,
  adaptationValue
) => {
  let geojsonLayer;
  let crisisLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');

    const scaleData = getMaxMinValues(
      adaptationValue === 'total' ? dimensionVariable : getAdaptationActualValue(adaptationValue, dimensionVariable),
      processed
    );
    const legendValues = getLegendValues(scaleData.minValue, scaleData.maxValue, colors.length);

    const legendContent = `<div style="display:flex;flex-direction:column;">
    <div>
    ${colors
      .map(
        (color) =>
          `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:50px;"></i>
        </span>`
      )
      .join('')}
    </div>
    <div>
    ${legendValues
      .map(
        (item, index) =>
          `${
            index === legendValues.length - 1
              ? `<span> ${item} (${dimensionVariable === 'Total_Climate_Share' ? '%' : 'million USD'})</span>`
              : `<span style="width:50px;">${item}</span>`
          }`
      )
      .join('')}
    </div>
     </div>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const style = (feature) => ({
    fillColor: colorFunction(
      adaptationValue === 'total'
        ? feature.properties[dimensionVariable]
        : feature.properties[getAdaptationActualValue(adaptationValue, dimensionVariable)],
      adaptationValue === 'total' ? dimensionVariable : getAdaptationActualValue(adaptationValue, dimensionVariable)
    ),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  const crisisStyle = (feature) => ({
    [feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue
      ? 'fillPattern'
      : 'fillColor']:
      feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue
        ? new window.L.StripePattern({
            weight: 2,
            spaceWeight: 1,
            angle: 45,
            color: '#d12568',
          }).addTo(mapInstance)
        : colorFunction(
            adaptationValue === 'total'
              ? feature.properties[dimensionVariable]
              : feature.properties[getAdaptationActualValue(adaptationValue, dimensionVariable)],
            adaptationValue === 'total'
              ? dimensionVariable
              : getAdaptationActualValue(adaptationValue, dimensionVariable)
          ),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  const resetHighlight = (e) => {
    geojsonLayer.resetStyle(e.target);
    crisisLayer.resetStyle(e.target);
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
    crisisLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
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
          let variable = 'Total_Climate_USD';
          let year = '2021';
          let vulnerability = 0;
          let adaptationVariable = 'total';

          // Filter
          const filterWrapper = addFilterWrapper(chartNode);
          const filterOptions = [
            { value: 'Total_Climate_USD', label: 'US$ millions' },
            { value: 'Total_Climate_Share', label: '% of total ODA' },
          ];
          const adaptationFilterOptions = [
            { value: 'total', label: 'Total climate finance' },
            { value: 'CCA', label: 'Climate adaptation finace' },
            { value: 'CCM', label: 'Climate mitigation finance' },
          ];
          const filterOptionMapping = [
            {
              name: 'Total_Climate_USD',
              label: 'US$ millions',
              scaleType: 'continous',
              unit: 'million',
            },
            {
              name: 'Total_Climate_Share',
              label: '% of total ODA',
              scaleType: 'continous',
              unit: '%',
            },
          ];

          // Initialise Legend
          const legend = window.L.control({ position: 'topright' });
          // Initialise reset button
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
                  'value_precise',
                  'protracted_crisis'
                );
                let finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
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
                    dimensionVariable === 'Total_Climate_Share' ||
                      dimensionVariable === 'CCA_Share' ||
                      dimensionVariable === 'CCM_Share'
                      ? d.replace('%', '')
                      : d,
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
                  crisisValue,
                  adaptationVariable
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
                    crisisValue,
                    adaptationVariable
                  );
                };

                const onSelectYear = (value) => {
                  // year = getYearFromMapping(value ? Number(value) : year);
                  year = value || year;
                  yearlyProcessedCountryNameData = filterDataByYear(processedCountryNameData, year);
                  groupedData = processedData(
                    countries,
                    yearlyProcessedCountryNameData,
                    'countryname',
                    'value_precise',
                    'protracted_crisis'
                  );
                  finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
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
                    crisisValue,
                    adaptationVariable
                  );
                };

                const onSelectVulnerability = (value) => {
                  vulnerability = value ? Number(value) : vulnerability;
                  finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
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
                    crisisValue,
                    adaptationVariable
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
                    crisisValue,
                    adaptationVariable
                  );
                };

                const onSelectAdaptation = (value) => {
                  adaptationVariable = value.value ? value.value : adaptationVariable;

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
                    crisisValue,
                    adaptationVariable
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
                      defaultValue={[{ value: 'Total_Climate_USD', label: 'US$ millions' }]}
                      onChange={onSelectDimension}
                      css={{
                        minWidth: '150px',
                      }}
                    />
                    <Select
                      classNamePrefix="climate-adaptation-select"
                      label="Select adaptation/mitigation"
                      options={adaptationFilterOptions}
                      defaultValue={[{ value: 'total', label: 'Total climate finance' }]}
                      onChange={onSelectAdaptation}
                      css={{
                        minWidth: '150px',
                      }}
                    />
                    <RangeSlider
                      label="Select a year"
                      min="2017"
                      max="2021"
                      defaultValue="2021"
                      step={1}
                      onChange={onSelectYear}
                      dataList={['2017', '2018', '2019', '2020', '2021']}
                      name="years"
                      incremental={false}
                    />
                    <RangeSlider
                      label="Select vulnerability level"
                      min="0"
                      max="4"
                      step={1}
                      onChange={onSelectVulnerability}
                      dataList={['All countries', 'Low', 'Medium', 'High', 'Very high']}
                      name="vulnerability"
                      incremental={false}
                      className="range-width vulnerability-range"
                    />
                    <CheckboxInput name="crisis" label="Highlight" onChange={onCrisisChange} />
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

                // Informational div
                // const info = window.L.control();
                // info.onAdd = function () {
                //   const infoDiv = window.L.DomUtil.create('div', 'infoDiv');
                //   infoDiv.innerHTML = `I am here`;
                //   const lnglat = window.L.latLng(23.984444, -74.925693);
                //   const pixelCoords = map.latLngToContainerPoint(lnglat);
                //   window.L.DomUtil.setPosition(infoDiv, window.L.point(pixelCoords.x, pixelCoords.y));

                //   return infoDiv;
                // };

                // info.addTo(map);

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
