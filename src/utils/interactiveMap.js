const closeIcon = 'https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg';
const responsePlan = 'https://devinit.org/assets/svg/icons/response-plan-icon-yellow.svg';
const colorArray = ['#fac47e', '#f7a838', '#df8000', '#ba6b15', '#7d4712'];

const crisisLegendData = [
  { score: '', label: 'Not in crisis' },
  { score: 'In Crisis', label: 'In crisis' },
  { score: 'Entering protracted crisis', label: 'Entering protracted crisis' },
  { score: 'In protracted crisis', label: 'In protracted crisis' },
];
const foodSecuritylegendData = [
  { score: 'Not assessed', label: 'No data' },
  { score: '2', label: '2' },
  { score: '3', label: '3' },
  { score: '3+', label: '3+' },
  { score: '4', label: '4' },
];

const climateVulnerabilityLegendData = [
  { score: '', label: 'No data' },
  { score: '1', label: 'Very low' },
  { score: '2', label: 'Low' },
  { score: '3', label: 'Medium' },
  { score: '4', label: 'High' },
  { score: '5', label: 'Very high' },
];
const legendData = [
  { variable: 'Crisis_type', data: crisisLegendData },
  { variable: 'IPC_Food_insecurity_phase', data: foodSecuritylegendData },
  { variable: 'People_in_need_(millions)' },
  { variable: 'Climate_vulnerability', data: climateVulnerabilityLegendData },
];

const removeWhitespace = (string) => string.trim();

const getCountryResponsePlan = (requirement, coverage, funding) =>
  requirement
    ? `${coverage}% funded (US$${removeWhitespace(funding)} million  of US$${removeWhitespace(requirement)} million)`
    : 'None';

const getRegionalResponsePlan = (requirement, funds, coverage) =>
  requirement
    ? `${coverage}% funded (US$${removeWhitespace(funds)} million of US$${removeWhitespace(requirement)} million)`
    : 'None';

const dataBoxContent = (data) => [
  {
    value: getCountryResponsePlan(
      data['Country_response_plan_requirements_(US$,_million)'],
      data['Country_response_plan_coverage_(%)'],
      data['Country_response_plan_funding_(US$,_million)']
    ),
    label: 'Country RP',
    icon: { image: responsePlan, text: 'response-plan' },
  },
  {
    value: getRegionalResponsePlan(
      data['Regional_response_plan_requirements_(US$,_million)'],
      data['Regional_response_plan_funding_(US$,_million)'],
      data['Regional_response_plan_coverage_(%)']
    ),
    label: 'Regional RP',
    icon: { image: responsePlan, text: 'response-plan' },
  },
];
const getOriginalCountryName = (csv, code) => {
  const countryMap = csv.map((stream) => ({ id: stream.Country_ID, name: stream.Country_name }));

  return countryMap.find((country) => country.id === code).name;
};

const matchCountryNames = (csvData, worldData, countryCodeVariable, countryNameVariable) => {
  const matchedData = csvData.map((stream) => {
    const streamCopy = { ...stream };
    const countryObject = worldData.find((feature) => feature.properties.iso_a3 === streamCopy[countryCodeVariable]);
    if (countryObject) {
      streamCopy[countryNameVariable] = countryObject.properties.name;
    }

    return streamCopy;
  });

  return matchedData;
};

const matchClimateCountryNames = (csvData, worldData, countryCodeVariable, countryNameVariable) => {
  const matchedData = csvData.map((stream) => {
    const streamCopy = { ...stream };
    const countryObject = worldData.find((feature) => feature.properties.ISO_A3 === streamCopy[countryCodeVariable]);
    if (countryObject) {
      streamCopy[countryNameVariable] = countryObject.properties.WB_NAME;
    }

    return streamCopy;
  });

  return matchedData;
};

const processedData = (countries, processedCountryData, countryVariable, valueVariable, extraVariable) => {
  const data = [];
  countries.forEach((country) => {
    const countryData = {};
    countryData.name = country;
    processedCountryData.forEach((stream) => {
      if (stream[countryVariable] === country) {
        countryData[stream.variable] = stream[valueVariable];
        if (extraVariable) {
          countryData[extraVariable] = stream[extraVariable];
        }
      }
    });
    data.push(countryData);
  });

  return data;
};

const dataInjectedGeoJson = (jsonData, groupedData) =>
  jsonData.map((feature) => {
    const featureCopy = { ...feature };
    const matchingCountryData = groupedData.find((countryData) => countryData.name === feature.properties.name);
    if (matchingCountryData) {
      featureCopy.properties = {
        ...feature.properties,
        ...matchingCountryData,
      };
    }

    return featureCopy;
  });

const climateDataInjectedGeojson = (jsonData, groupedData) =>
  jsonData.map((feature) => {
    const featureCopy = { ...feature };
    const matchingCountryData = groupedData.find((countryData) => countryData.name === feature.properties.WB_NAME);
    if (matchingCountryData) {
      featureCopy.properties = {
        ...feature.properties,
        ...matchingCountryData,
      };
    }

    return featureCopy;
  });

const getColor = (score, variable) => {
  if (variable === 'Crisis_type') {
    switch (score) {
      case 'In protracted crisis':
        return '#7d4712';
      case 'Entering protracted crisis':
        return '#ba6b15';
      case 'In Crisis':
        return '#df8000';
      default:
        return '#E6E1E5';
    }
  } else if (variable === 'IPC_Food_insecurity_phase') {
    switch (score) {
      case '4':
        return '#7d4712';
      case '3+':
        return '#ba6b15';
      case '3':
        return '#df8000';
      case '2':
        return '#f7a838';
      default:
        return '#E6E1E5';
    }
  } else {
    switch (score) {
      case '5':
        return '#7d4712';
      case '4':
        return '#ba6b15';
      case '3':
        return '#df8000';
      case '2':
        return '#f7a838';
      case '1':
        return '#fac47e';
      default:
        return '#E6E1E5';
    }
  }
};

const onCloseDatabox = (e, databoxElement) => {
  e.stopPropagation();
  databoxElement.update();
  const databoxContainer = document.querySelector('[data-id="databoxContainer"]');
  databoxContainer.style.display = 'none';
};

const handleClickFeature = (e, mapInstance, databoxInstance, csv) => {
  databoxInstance.addTo(mapInstance);
  const layer = e.target;
  window.dataLayer.push({
    event: 'countryClicked',
    country: getOriginalCountryName(csv, layer.feature.properties.iso_a3),
  });
  databoxInstance.update(layer.feature.properties, csv);
};

// data box
const dataBox = window.L.control({ position: 'bottomright' });
dataBox.onAdd = function () {
  this.div = window.L.DomUtil.create('div', 'databox'); // create a div with a class "databox"
  this.div.setAttribute('data-id', 'databoxContainer');
  this.update();

  return this.div;
};

dataBox.update = function (properties, csv) {
  this.div.innerHTML = properties
    ? `<div style="padding-bottom: 0px;">${getOriginalCountryName(
        csv,
        properties.iso_a3
      )} <button id=closeDatabox><img src=${closeIcon} alt=close height=20 width=20 ></img></button></div><div style="margin-top: 8px;"> ${dataBoxContent(
        properties
      )
        .map(
          (item) =>
            `<span><img src=${item.icon.image} alt=${item.icon.text} height=20 width=20 ></img><p>${item.label}: ${item.value}</p> </span>`
        )
        .join('')}</div>`
    : '';
  const closeButton = document.getElementById('closeDatabox');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => onCloseDatabox(e, dataBox));
  }
};

const highlightFeature = (e, variable, filterOptions, csvData) => {
  const layer = e.target;
  const databoxContainer = document.querySelector('[data-id="databoxContainer"]');
  if (databoxContainer && databoxContainer.style.display !== 'none') {
    dataBox.update();
    databoxContainer.style.display = 'none';
  }

  layer.setStyle({
    fillColor: '#5da3d9',
    color: '#484848',
    weight: 2,
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer
    .bindTooltip(
      layer.feature.properties[variable] !== 'No data' && layer.feature.properties[variable] !== 'Not assessed'
        ? `<div>${getOriginalCountryName(csvData, layer.feature.properties.iso_a3)}<br>${
            filterOptions.find((option) => option.name === variable).label
          }: ${
            variable === 'Food_insecure_(millions)' && layer.feature.properties[variable] === '0.0'
              ? '< 0.1'
              : layer.feature.properties[variable]
          }<span style="padding-left: 2px;">${
            filterOptions.find((option) => option.name === variable).unit
          }</span></div>`
        : `<div>${getOriginalCountryName(csvData, layer.feature.properties.iso_a3)}<br> Not assessed</div>`,
      { direction: 'top', opacity: 1 }
    )
    .openTooltip();
};

const getColorDynamic = (value, minValue, maxValue, increment, chromaInstance, colors) => {
  // Generate a range of values between the minimum and maximum value
  const values = [];

  for (let i = minValue; i <= maxValue; i += increment) {
    values.push(i);
  }

  const colorGen = chromaInstance.scale(colors).domain(values);

  return colorGen(Math.abs(value));
};

const getMaxMinValues = (dataType, csvData) => {
  const dataList = csvData.map((item) => Number(item[dataType]));

  return {
    maxValue: Math.ceil(Math.max(...dataList)),
    minValue: Math.ceil(Math.min(...dataList)) < 10 ? 0 : Math.ceil(Math.min(...dataList)),
  };
};

const getClimateOriginalCountryName = (csv, code) =>
  csv.find((stream) => stream.iso3 === code) ? csv.find((stream) => stream.iso3 === code).countryname : '';

const vulnerabilityLabelMapping = (value) => {
  if (value >= 0 && value < 40) {
    return 'Very low';
  }
  if (value >= 40 && value < 50) {
    return 'Low';
  }
  if (value >= 50 && value < 55) {
    return 'Medium';
  }
  if (value >= 55 && value < 60) {
    return 'High';
  }
  if (value >= 60) {
    return 'Very high';
  }

  return 'Not assessed';
};

const highlightClimateMapFeature = (e, variable, csvData, map, crisisValue) => {
  const layer = e.target;
  if (layer.feature.properties.protracted_crisis && crisisValue) {
    layer.setStyle({
      color: '#484848',
      weight: 2,
      fillPattern: new window.L.StripePattern({
        weight: 2,
        spaceOpacity: 1,
        spaceColor: '#df8000',
        spaceWeight: 6,
        angle: 45,
        color: '#d12568',
      }).addTo(map),
    });
  } else {
    layer.setStyle({
      fillColor: '#df8000',
      color: '#484848',
      weight: 2,
    });
  }

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  const country = getClimateOriginalCountryName(csvData, layer.feature.properties.ISO_A3);

  layer
    .bindTooltip(
      layer.feature.properties[variable]
        ? `<div>${country || layer.feature.properties.WB_NAME}<br>
          Adaptation:  US$${Number(layer.feature.properties.CCA_USD).toFixed(1)} (${
            Number(layer.feature.properties.Total_Climate_USD) !== 0
              ? (
                  (Number(layer.feature.properties.CCA_USD) / Number(layer.feature.properties.Total_Climate_USD)) *
                  100
                ).toFixed(1)
              : 0
          }%)<br>
          Mitigation: US$${Number(layer.feature.properties.CCM_USD).toFixed(1)} (${
            Number(layer.feature.properties.Total_Climate_USD) !== 0
              ? (
                  (Number(layer.feature.properties.CCM_USD) / Number(layer.feature.properties.Total_Climate_USD)) *
                  100
                ).toFixed(1)
              : 0
          }%)<br>
          Climate vulnerability: ${
            layer.feature.properties.Vulnerability_Score_new
              ? vulnerabilityLabelMapping(Number(layer.feature.properties.Vulnerability_Score_new))
              : 'Not assesed'
          }<br>
          ${layer.feature.properties.protracted_crisis ? `In protracted crisis` : ''}
          </div>
          `
        : `<div>${country}<br> Not assessed</div>`,
      { direction: 'top', opacity: 1 }
    )
    .openTooltip();
};

const cleanClimateShare = (value) => (value ? value.replace('%', '') : '');

const getColorFinance = (value) => {
  if (value >= 0 && value < 0.0001) {
    return '#d3e0f4';
  }
  if (value >= 0.0001 && value < 0.001) {
    return '#a3c7eb';
  }
  if (value >= 0.001 && value < 0.01) {
    return '#77adde';
  }
  if (value >= 0.01 && value < 0.1) {
    return '#4397d3';
  }
  if (value >= 0.1 && value < 1) {
    return '#105fa3';
  }
  if (value >= 1) {
    return '#00538e';
  }

  return '#E6E1E5';
};

const getColorClimateShare = (value) => {
  const cleanValue = cleanClimateShare(value) ? Number(cleanClimateShare(value)) : undefined;
  if (cleanValue >= 0 && cleanValue < 7.5) {
    return '#bcd4f0';
  }
  if (cleanValue >= 7.5 && cleanValue < 15) {
    return '#77adde';
  }
  if (cleanValue >= 15 && cleanValue < 22.5) {
    return '#5da3d9';
  }
  if (cleanValue >= 22.5 && cleanValue < 30) {
    return '#0089cc';
  }
  if (cleanValue >= 30) {
    return '#0c457b';
  }

  return '#E6E1E5';
};

export {
  dataBoxContent,
  highlightFeature,
  matchCountryNames,
  processedData,
  dataInjectedGeoJson,
  onCloseDatabox,
  handleClickFeature,
  dataBox,
  getColor,
  getColorDynamic,
  getMaxMinValues,
  colorArray,
  legendData,
  highlightClimateMapFeature,
  getClimateOriginalCountryName,
  getColorFinance,
  matchClimateCountryNames,
  climateDataInjectedGeojson,
  vulnerabilityLabelMapping,
  getColorClimateShare,
};
