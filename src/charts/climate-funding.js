/* eslint-disable no-underscore-dangle */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import 'leaflet.pattern';
import MapResetButton from '../components/MapResetButton';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  processedData,
  highlightClimateMapFeature,
  getColorFinance,
  matchClimateCountryNames,
  climateDataInjectedGeojson,
  vulnerabilityLabelMapping,
  getColorClimateShare,
} from '../utils/interactiveMap';
import { addFilterWrapper } from '../widgets/filters';
import Select from '../components/Select';
import RangeSlider from '../components/RangeSlider';
import CheckboxInput from '../components/CheckboxInput';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/custom.json`;
const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#bcd4f0', '#77adde', '#5da3d9', '#0089cc', '#0c457b'];
const financeColors = ['#d3e0f4', '#a3c7eb', '#77adde', '#4397d3', '#105fa3', '#0a3a64'];
const financeLegendMapping = ['0', '0.1m', '1m', '10m', '100m', '1b', '1.5b'];
const shareLegendMapping = [0, 7.5, 15, 22.5, 30, 37.5];
const otherShareLegendMapping = [0, 7, 14, 21, 28, 35];
const vulnerabilityMapping = [
  { label: 4, value: 60, text: 'Very high' },
  { label: 3, value: 55, text: 'High', min: 55, max: 60 },
  { label: 2, value: 50, text: 'Medium', min: 50, max: 55 },
  { label: 1, value: 40, text: 'Low', min: 40, max: 50 },
  { label: 0, value: 0, text: 'Very low', min: 0, max: 40 },
];

const filterByVulnerability = (data, value) => {
  if (value === 0) {
    return data;
  }

  const mappingData = vulnerabilityMapping.find((item) => item.value === value);

  return mappingData.value === 60
    ? data.filter((d) => d.Vulnerability_Score_new >= 60)
    : data.filter((d) => d.Vulnerability_Score_new < mappingData.max && d.Vulnerability_Score_new >= mappingData.min);
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

    return dimension === 'Total_Climate_Share' ? getColorClimateShare(value, adaptation) : getColorFinance(value);
  }

  return '#E6E1E5';
};

const smallCountryMarkerData = [
  {
    label: 'Solomon Islands',
    name: 'Solomon Is.',
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
    name: 'São Tomé and Principe',
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
    label: 'Saint Vincent and the Grenadines',
    name: 'St. Vin. and Gren.',
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
    label: 'Marshall Islands',
    name: 'Marshall Is.',
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
    label: 'Antigua and Barbuda',
    name: 'Antigua and Barb.',
    coordinates: [17.195139, -61.306447],
  },
];

const getClimateShareLegendText = (adaptation) => {
  if (adaptation === 'total') {
    return shareLegendMapping
      .map(
        (item, index) =>
          `${
            index === shareLegendMapping.length - 1
              ? `<span> ${item} (%)</span>`
              : `<span style="width:50px;">${item}</span>`
          }`,
      )
      .join('');
  }

  return otherShareLegendMapping
    .map(
      (item, index) =>
        `${
          index === otherShareLegendMapping.length - 1
            ? `<span> ${item} (%)</span>`
            : `<span style="width:50px;">${item}</span>`
        }`,
    )
    .join('');
};

const renderMap = (
  dimensionVariable,
  mapInstance,
  colorFunction,
  data,
  processed,
  legendInstance,
  groupInstance,
  csvData,
  crisisValue,
  adaptationValue,
) => {
  let geojsonLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');

    const legendContent = `<div style="display:flex;flex-direction:column;">
    <div>
    ${
      dimensionVariable === 'Total_Climate_Share'
        ? colors
            .map(
              (color) =>
                `<span>
      <i style="background:${color};border-radius:1px;margin-right:0;width:50px;"></i>
    </span>`,
            )
            .join('')
        : financeColors
            .map(
              (color) =>
                `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:50px;"></i>
        </span>`,
            )
            .join('')
    }
    </div>
    <div>
    ${
      dimensionVariable === 'Total_Climate_Share'
        ? getClimateShareLegendText(adaptationValue)
        : financeLegendMapping
            .map(
              (item, index) => `
        <span style="width:45px;">${index === financeLegendMapping.length - 1 ? `${item} (US$)` : item}</span>
        `,
            )
            .join('')
    }
    </div>
     </div>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const getStyleColor = (feature) => {
    if (dimensionVariable === 'Total_Climate_Share') {
      return colorFunction(getVariableValue(dimensionVariable, feature, adaptationValue), adaptationValue);
    }

    return colorFunction(getVariableValue(dimensionVariable, feature, adaptationValue));
  };

  // Map style
  const getStyle = (feature) => {
    if (feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue) {
      return new window.L.StripePattern({
        fill: true,
        weight: 2,
        spaceWeight: 6,
        spaceColor: getStyleColor(feature),
        spaceOpacity: 1,
        angle: 45,
        color: '#d12568',
      }).addTo(mapInstance);
    }

    return getStyleColor(feature);
  };
  const style = (feature) => ({
    [feature.properties.protracted_crisis && feature.properties[dimensionVariable] && crisisValue
      ? 'fillPattern'
      : 'fillColor']: getStyle(feature),
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
        mouseover: (e) => highlightClimateMapFeature(e, dimensionVariable, csvData, mapInstance, crisisValue),
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
        adaptationValue,
      )};' class='marker-pin'></div>`,
    });
    const marker = window.L.marker(item.coordinates, {
      icon: myIcon,
    });
    if (iconData) {
      marker.bindTooltip(
        iconData[dimensionVariable]
          ? `<div>${item.label ? item.label : item.name}<br>
    Total climate ODA: US$${Number(iconData.Total_Climate_USD).toFixed(1)}m<br>
    Adaptation:  US$ ${Number(iconData.CCA_USD).toFixed(1)}m ( ${
      Number(iconData.Total_Climate_USD) !== 0
        ? ((Number(iconData.CCA_USD) / Number(iconData.Total_Climate_USD)) * 100).toFixed(1)
        : 0
    }%)<br>
    Mitigation: US$ ${Number(iconData.CCM_USD).toFixed(1)}m (${
      Number(iconData.Total_Climate_USD) !== 0
        ? ((Number(iconData.CCM_USD) / Number(iconData.Total_Climate_USD)) * 100).toFixed(1)
        : 0
    }%)<br>
    Climate vulnerability: ${
      iconData.Vulnerability_Score_new
        ? vulnerabilityLabelMapping(Number(iconData.Vulnerability_Score_new))
        : 'Not assesed'
    }<br>
    Share of total ODA: ${
      Number(iconData.Total_ODA_USD) !== 0
        ? `${((Number(iconData.Total_Climate_USD) / Number(iconData.Total_ODA_USD)) * 100).toFixed(1)}%`
        : '0%'
    }<br>
    ${iconData.protracted_crisis ? `In protracted crisis` : ''}
    </div>
    `
          : `<div>${item.name}<br> Not assessed</div>`,
        { direction: 'top', opacity: 1 },
      );

      marker.on('mouseover', (e) => {
        e.target.openTooltip();
        e.target._icon.childNodes[0].style.backgroundColor = '#df8000';
      });
      marker.on('mouseout', (e) => {
        e.target.closePopup();
        e.target._icon.childNodes[0].style.backgroundColor = getCurrentIconColor(
          processed,
          dimensionVariable,
          item.name,
          adaptationValue,
        );
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
            center: [6.6, 14.1],
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
            { value: 'total', label: 'Total climate ODA' },
            { value: 'CCA', label: 'Climate adaptation ODA' },
            { value: 'CCM', label: 'Climate mitigation ODA' },
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
                  'protracted_crisis',
                );
                let finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
                let crisisValue;

                const fg = window.L.featureGroup().addTo(map);

                // Render default map
                renderMap(
                  variable,
                  map,
                  variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                  geojsonData,
                  finalFilteredData,
                  legend,
                  fg,
                  data,
                  crisisValue,
                  adaptationVariable,
                );

                const onSelectDimension = (dimension) => {
                  variable = dimension.value ? dimension.value : variable;

                  renderMap(
                    variable,
                    map,
                    variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                    geojsonData,
                    finalFilteredData,
                    legend,
                    fg,
                    data,
                    crisisValue,
                    adaptationVariable,
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
                    'protracted_crisis',
                  );
                  finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
                  renderMap(
                    variable,
                    map,
                    variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                    geojsonData,
                    finalFilteredData,
                    legend,
                    fg,
                    data,
                    crisisValue,
                    adaptationVariable,
                  );
                };

                const onSelectVulnerability = (value) => {
                  vulnerability = value ? Number(value) : vulnerability;
                  finalFilteredData = filterByVulnerability(groupedData, getVulnerabilityValue(vulnerability));
                  renderMap(
                    variable,
                    map,
                    variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                    geojsonData,
                    finalFilteredData,
                    legend,
                    fg,
                    data,
                    crisisValue,
                    adaptationVariable,
                  );
                };

                const onCrisisChange = (value) => {
                  crisisValue = value;

                  renderMap(
                    variable,
                    map,
                    variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                    geojsonData,
                    finalFilteredData,
                    legend,
                    fg,
                    data,
                    crisisValue,
                    adaptationVariable,
                  );
                };

                const onSelectAdaptation = (value) => {
                  adaptationVariable = value.value ? value.value : adaptationVariable;

                  renderMap(
                    variable,
                    map,
                    variable === 'Total_Climate_Share' ? getColorClimateShare : getColorFinance,
                    geojsonData,
                    finalFilteredData,
                    legend,
                    fg,
                    data,
                    crisisValue,
                    adaptationVariable,
                  );
                };

                const onReset = () => {
                  map.setView([[6.6, 14.1]], 1);
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
                      defaultValue={[{ value: 'total', label: 'Total climate ODA' }]}
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
                      className={'year-slider'}
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
                  </div>,
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
