const closeIcon = 'https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg';
const responsePlan = 'https://devinit.org/assets/svg/icons/response-plan-icon.svg';

const addCommas = (amount) => {
  if (amount.length > 3) {
    let finalAmount = '';
    const splitAmount = amount.split('');
    splitAmount.forEach((item, index) => {
      if (index === 1) {
        finalAmount = finalAmount.concat(`,${item}`);
      } else {
        finalAmount = finalAmount.concat(item);
      }
    });

    return finalAmount;
  }

  return amount;
};
const getCountryResponsePlan = (requirement, coverage, funding) =>
  requirement
    ? `${coverage}% funded(US$${addCommas(funding)} million  of US$${addCommas(requirement)} million)`
    : 'None';

const getRegionalResponsePlan = (requirement, funds, coverage) =>
  requirement ? `${coverage}% funded(US$${addCommas(funds)} million of US$${addCommas(requirement)} million)` : 'None';

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

const matchCountryNames = (csvData, worldData) => {
  const matchedData = csvData.map((stream) => {
    const streamCopy = { ...stream };
    const countryObject = worldData.find((feature) => feature.properties.iso_a3 === streamCopy.Country_ID);
    if (countryObject) {
      streamCopy.Country_name = countryObject.properties.name;
    }

    return streamCopy;
  });

  return matchedData;
};

const processedData = (countries, processedCountryData) => {
  const data = [];
  countries.forEach((country) => {
    const countryData = {};
    countryData.name = country;
    processedCountryData.forEach((stream) => {
      if (stream.Country_name === country) {
        countryData[stream.variable] = stream.value;
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

const getColor = (score) => {
  switch (score) {
    case 'Very high':
      return '#7d4712';
    case 'High':
      return '#ba6b15';
    case 'Medium':
      return '#df8000';
    case 'Low':
      return '#f7a838';
    case 'Very low':
      return '#fac47e';
    case 'Not assessed':
      return '#E6E1E5';
    default:
      return '#E6E1E5';
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
};
