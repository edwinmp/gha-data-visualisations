/** @jsx jsx */
import chroma from 'chroma-js';
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import 'leaflet.pattern';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  processedData,
  getColorDynamic,
  highlightClimateMapFeature,
  getColorFinance,
  matchClimateCountryNames,
  climateDataInjectedGeojson,
  vulnerabilityLabelMapping,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';
import Select from '../components/Select';
import RangeSlider from '../components/RangeSlider';
import CheckboxInput from '../components/CheckboxInput';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#bcd4f0', '#77adde', '#5da3d9', '#0089cc', '#0c457b'];
const financeColors = ['#d3e0f4', '#a3c7eb', '#77adde', '#4397d3', '#105fa3', '#00538e'];
const financeLegendMapping = ['0', '0.1m', '1m', '10m', '100m', '1b', '1.5b'];
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

const getColorContinous = (d, dimensionVariable, groupedData) => {
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

const getVariableValue = (variable, feature, adaptationValue) => {
  if (adaptationValue === 'total') {
    if (variable === 'Total_Climate_Share') {
      return feature.properties[variable];
    }

    return feature.properties[variable] / 1000;
  }

  return variable === 'Total_Climate_Share'
    ? feature.properties[getAdaptationActualValue(adaptationValue, variable)]
    : feature.properties[getAdaptationActualValue(adaptationValue, variable)] / 1000;
};

const getMarkerCountryData = (data, name) => data.find((d) => d.name === name);

const getCurrentIconColor = (data, dimension, name, adaptation) => {
  const countryData = getMarkerCountryData(data, name);
  if (countryData) {
    let value;
    if (adaptation === 'total') {
      if (dimension === 'Total_Climate_Share') {
        value = countryData[dimension];
      } else {
        value = countryData[dimension] / 1000;
      }
    } else {
      value =
        dimension === 'Total_Climate_Share'
          ? countryData[getAdaptationActualValue(adaptation, dimension)]
          : countryData[getAdaptationActualValue(adaptation, dimension)] / 1000;
    }

    return dimension === 'Total_Climate_Share'
      ? getColorContinous(
          value,
          adaptation === 'total' ? dimension : getAdaptationActualValue(adaptation, dimension),
          data
        )
      : getColorFinance(value, adaptation === 'total' ? dimension : getAdaptationActualValue(adaptation, dimension));
  }

  return '#E6E1E5';
};

const smallCountryMarkerData = [
  {
    name: 'Solomon Islands',
    coordinates: [-10.575488, 161.755118],
  },
  {
    name: 'Vanuatu',
    coordinates: [-15.04767, 166.737858],
  },
  {
    name: 'Comoros',
    coordinates: [-11.638005, 43.328645],
  },
  {
    name: 'Cabo Verde',
    coordinates: [16.841028, -23.742468],
  },
  {
    name: 'São Tomé and Príncipe',
    coordinates: [0.384856, 6.651183],
  },
  {
    name: 'Mauritius',
    coordinates: [-21.008972, 55.405847],
  },
  {
    name: 'Fiji',
    coordinates: [-17.493468, 178.018069],
  },
  {
    name: 'Samoa',
    coordinates: [-13.494016, -172.520477],
  },
  {
    name: 'Saint Vincent and the Grenadines',
    coordinates: [13.348472, -61.147504],
  },
  {
    name: 'Tuvalu',
    coordinates: [-8.444944, 179.127396],
  },
  {
    name: 'Tonga',
    coordinates: [-21.141279, -175.303819],
  },
  {
    name: 'Timor-Leste',
    coordinates: [-8.555272, 126.67637],
  },
  {
    name: 'Tokelau',
    coordinates: [-9.129344, -171.840652],
  },
  {
    name: 'Seychelles',
    coordinates: [-4.596714, 55.443287],
  },
  {
    name: 'Palau',
    coordinates: [7.599856, 134.62149],
  },
  {
    name: 'Nauru',
    coordinates: [-0.520427, 166.936612],
  },

  {
    name: 'Marshall Islands',
    coordinates: [7.583201, 168.612489],
  },
  {
    name: 'Maldives',
    coordinates: [-0.383325, 73.103751],
  },
  {
    name: 'Kiribati',
    coordinates: [1.784491, -157.299146],
  },
  {
    name: 'Antigua and Barbuda',
    coordinates: [17.195139, -61.306447],
  },
  // {
  //   name: 'Cook Islands',
  //   coordinates: [-21.251607, -159.764738],
  // },
  // {
  //   name: 'Micronesia',
  //   coordinates: [6.952106, 158.228441],
  // },
];
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
    ${
      dimensionVariable === 'Total_Climate_Share'
        ? colors
            .map(
              (color) =>
                `<span>
      <i style="background:${color};border-radius:1px;margin-right:0;width:50px;"></i>
    </span>`
            )
            .join('')
        : financeColors
            .map(
              (color) =>
                `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:50px;"></i>
        </span>`
            )
            .join('')
    }
    </div>
    <div>
    ${
      dimensionVariable === 'Total_Climate_Share'
        ? legendValues
            .map(
              (item, index) =>
                `${
                  index === legendValues.length - 1
                    ? `<span> ${item} (%)</span>`
                    : `<span style="width:50px;">${item}</span>`
                }`
            )
            .join('')
        : financeLegendMapping
            .map(
              (item, index) => `
        <span style="width:45px;">${index === financeLegendMapping.length - 1 ? `${item} ($)` : item}</span>
        `
            )
            .join('')
    }
    </div>
     </div>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const style = (feature) => ({
    fillColor:
      dimensionVariable === 'Total_Climate_Share'
        ? colorFunction(
            getVariableValue(dimensionVariable, feature, adaptationValue),
            adaptationValue === 'total'
              ? dimensionVariable
              : getAdaptationActualValue(adaptationValue, dimensionVariable),
            processed
          )
        : colorFunction(
            getVariableValue(dimensionVariable, feature, adaptationValue),
            adaptationValue === 'total'
              ? dimensionVariable
              : getAdaptationActualValue(adaptationValue, dimensionVariable)
          ),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  const getCrisisColorStyle = (feature) => {
    if (feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue) {
      return new window.L.StripePattern({
        weight: 2,
        spaceWeight: 1,
        angle: 45,
        color: '#d12568',
      }).addTo(mapInstance);
    }
    if (dimensionVariable === 'Total_Climate_Share') {
      return colorFunction(
        getVariableValue(dimensionVariable, feature, adaptationValue),
        adaptationValue === 'total' ? dimensionVariable : getAdaptationActualValue(adaptationValue, dimensionVariable),
        processed
      );
    }

    return colorFunction(
      getVariableValue(dimensionVariable, feature, adaptationValue),
      adaptationValue === 'total' ? dimensionVariable : getAdaptationActualValue(adaptationValue, dimensionVariable)
    );
  };
  const crisisStyle = (feature) => ({
    [feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue
      ? 'fillPattern'
      : 'fillColor']: getCrisisColorStyle(feature),
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
  // Add markers for small island countries

  smallCountryMarkerData.forEach((item) => {
    const iconData = getMarkerCountryData(processed, item.name);
    const myIcon = window.L.divIcon({
      className: 'my-div-icon',
      html: `<div style='background-color:${getCurrentIconColor(
        processed,
        dimensionVariable,
        item.name,
        adaptationValue
      )};' class='marker-pin'></div>`,
    });
    const highlightedMarker = window.L.divIcon({
      className: 'my-div-icon',
      html: `<div style='background-color:#df8000;' class='marker-pin'></div>`,
    });
    const marker = window.L.marker(item.coordinates, {
      icon: myIcon,
    });
    if (iconData) {
      marker.on({
        mouseover: (e) => {
          e.target.setIcon(highlightedMarker);
          marker
            .bindTooltip(
              iconData[dimensionVariable]
                ? `<div>${item.name}<br>
          Adaptation:  US$ ${Number(iconData.CCA_USD).toFixed(1)} ( ${
                    Number(iconData.Total_Climate_USD) !== 0
                      ? ((Number(iconData.CCA_USD) / Number(iconData.Total_Climate_USD)) * 100).toFixed(1)
                      : 0
                  }%)<br>
          Mitigation: US$ ${Number(iconData.CCM_USD).toFixed(1)} (${
                    Number(iconData.Total_Climate_USD) !== 0
                      ? ((Number(iconData.CCM_USD) / Number(iconData.Total_Climate_USD)) * 100).toFixed(1)
                      : 0
                  }%)<br>
          Climate vulnerability: ${
            iconData.Vulnerability_Score_new
              ? vulnerabilityLabelMapping(Number(iconData.Vulnerability_Score_new))
              : 'Not assesed'
          }<br>
          ${iconData.protracted_crisis ? `In protracted crisis` : ''}
          </div>
          `
                : `<div>${item.name}<br> Not assessed</div>`,
              { direction: 'top', opacity: 1 }
            )
            .openTooltip();
        },
        mouseout: (e) => {
          e.target.setIcon(myIcon);
          e.target.closePopup();
        },
      });
    }

    marker.addTo(mapInstance);
  });

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(climateDataInjectedGeojson(data, processed), {
      style,
      onEachFeature,
    });
    crisisLayer = window.L.geoJSON(climateDataInjectedGeojson(data, processed), {
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
                const processedCountryNameData = matchClimateCountryNames(data, geojsonData, 'iso3', 'countryname');
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

                // Render default map
                renderMap(
                  variable,
                  map,
                  variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
                    variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
                    variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
                    variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
                    variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
                    variable === 'Total_Climate_Share' ? getColorContinous : getColorFinance,
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
