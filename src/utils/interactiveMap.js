const closeIcon = 'https://devinit.org/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg';
const responsePlan = 'https://devinit.org/assets/svg/icons/response-plan-icon.svg';

const getCountryResponsePlan = (requirement, coverage) => {
  if (requirement) {
    const fundInDollars = Math.round((Number(coverage) / 100) * Number(requirement));

    return `${coverage}% funded[US$${fundInDollars}  of US$${requirement}]`;
  }

  return 'None';
};
const getRegionalResponsePlan = (requirement, funds) =>
  requirement
    ? `${Math.round((Number(funds) / Number(requirement)) * 100)}% funded[US$${funds} of US$${requirement}]`
    : 'None';

const dataBoxContent = (data) => [
  {
    value: getCountryResponsePlan(
      data['Country_response_plan_requirements_(US$,_million)'],
      data['Country_response_plan_coverage_(%)']
    ),
    label: 'Country response plan',
    icon: { image: responsePlan, text: 'response-plan' },
  },
  {
    value: getRegionalResponsePlan(
      data['Regional_response_plan_requirements_(US$,_million)'],
      data['Regional_response_plan_funding_(US$,_million)']
    ),
    label: 'Regional response plan',
    icon: { image: responsePlan, text: 'response-plan' },
  },
];

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
      return '#7F1850';
    case 'High':
      return '#AD1156';
    case 'Medium':
      return '#D64279';
    case 'Low':
      return '#E4819B';
    case 'Very low':
      return '#F6B9C2';
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

const handleClickFeature = (e, mapInstance, databoxInstance) => {
  databoxInstance.addTo(mapInstance);
  const layer = e.target;
  databoxInstance.update(layer.feature.properties);
};

// data box
const dataBox = window.L.control({ position: 'bottomright' });
dataBox.onAdd = function () {
  this.div = window.L.DomUtil.create('div', 'databox'); // create a div with a class "databox"
  this.div.setAttribute('data-id', 'databoxContainer');
  this.update();

  return this.div;
};

dataBox.update = function (props) {
  this.div.innerHTML = props
    ? `<div>${
        props.name
      } <button id=closeDatabox><img src=${closeIcon} alt=close height=20 width=20 ></img></button></div> <br> ${dataBoxContent(
        props
      )
        .map(
          (item) =>
            `<span><img src=${item.icon.image} alt=${item.icon.text} height=20 width=20 ></img><p>${item.label}: ${item.value}</p> </span>`
        )
        .join('')}`
    : '';
  const closeButton = document.getElementById('closeDatabox');
  if (closeButton) {
    closeButton.addEventListener('click', (e) => onCloseDatabox(e, dataBox));
  }
};

const highlightFeature = (e, variable, filterOptions) => {
  const layer = e.target;
  const databoxContainer = document.querySelector('[data-id="databoxContainer"]');
  if (databoxContainer && databoxContainer.style.display !== 'none') {
    dataBox.update();
    databoxContainer.style.display = 'none';
  }

  layer.setStyle({
    fillColor: 'yellow',
    color: 'black',
    weight: 2,
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer
    .bindPopup(
      layer.feature.properties[variable]
        ? `<div>${layer.feature.properties.name}<br>${
            filterOptions.find((option) => option.name === variable).label
          }: ${layer.feature.properties[variable]}<span style="padding-left: 2px;">${
            filterOptions.find((option) => option.name === variable).unit
          }</span></div>`
        : `<div>${layer.feature.properties.name}<br> No data</div>`
    )
    .openPopup();
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
