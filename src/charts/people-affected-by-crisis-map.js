import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import climateVulnerability from '../../public/assets/svg/icons/Climate-vulnerability-icon.svg';
import covidVaccination from '../../public/assets/svg/icons/Covid-vaccination-icon.svg';
import crisisDuration from '../../public/assets/svg/icons/Crisis-duration-icon.svg';
import crisisType from '../../public/assets/svg/icons/Crisis-type-icon.svg';
import peopleInNeed from '../../public/assets/svg/icons/People-in-need-icon.svg';
import responsePlan from '../../public/assets/svg/icons/Response-plan-icon.svg';
import crisisSeverity from '../../public/assets/svg/icons/Crisis-severity-icon.svg';
import closeIcon from '../../public/assets/svg/icons/cross.colors-poppy-slate-blank-poppydark.svg';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/map_data_long.csv`;

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
      return 'black';
    default:
      return '#E6E1E5';
  }
};

const highlightFeature = (e, variable) => {
  const layer = e.target;

  layer.setStyle({
    fillColor: 'yellow',
    color: 'black',
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer
    .bindPopup(
      layer.feature.properties[variable]
        ? `<div>${layer.feature.properties.name}<br>${variable}: ${layer.feature.properties[variable]}</div>`
        : layer.feature.properties.name
    )
    .openPopup();
};

const onLegendAdd = () => {
  const div = window.L.DomUtil.create('div', 'legend');
  const legendData = [
    { score: '5', label: '5 - Very High' },
    { score: '4', label: '4 - High' },
    { score: '3', label: '3 - Medium' },
    { score: '2', label: '2 - Low' },
    { score: '1', label: '1 - Very Low' },
    { score: '', label: 'Not assessed' },
  ];

  const legendContent = legendData
    .map((data) => `<span><i style="background:${getColor(data.score)}"></i><label>${data.label}</label></span>`)
    .join('');
  div.innerHTML = legendContent;

  return div;
};

const getCrisisType = (data) => {
  const finalValue = [];
  if (Number(data.Conflict_marker) > 0) {
    finalValue.push('Conflict');
  }
  if (Number(data.Displacement_marker) > 0) {
    finalValue.push('Displacement');
  }
  if (Number(data.Physical_disaster_marker) > 0) {
    finalValue.push('Natural hazard');
  }

  return finalValue.join(', ');
};
const getSeverity = (score) => {
  switch (score) {
    case '5':
      return 'Very high';
    case '4':
      return 'High';
    case '3':
      return 'Medium';
    case '2':
      return 'Low';
    case '1':
      return 'Very Low';
    case '':
      return 'Not assessed';
    default:
      return '';
  }
};

const getCrisisDuration = (data) => `${data['Protracted/Recurrent_crisis']}, ${data.Years_of_consecutive_crisis} years`;
const getCountryResponsePlan = (requirement, coverage) => {
  if (requirement) {
    const fundInDollars = Math.round((Number(coverage) / 100) * Number(requirement));

    return `${coverage}% funded[US$${fundInDollars}  of ${requirement}]`;
  }

  return 'Not assessed';
};
const getRegionalResponsePlan = (requirement, funds) =>
  requirement
    ? `${Math.round((Number(funds) / Number(requirement)) * 100)}% funded[US$${funds} of ${requirement}]`
    : 'Not assessed';

const dataBoxContent = (data) => [
  { value: data['People_in_need_(millions)'], label: 'People in need', icon: peopleInNeed },
  { value: getCrisisType(data), label: 'Crisis type', icon: crisisType },
  { value: getSeverity(data.Severity_score), label: 'Severity of crisis', icon: crisisSeverity },
  { value: getCrisisDuration(data), label: 'Crisis duration', icon: crisisDuration },
  {
    value: `${data.COVID_vaccination_rate}% of the population vaccinated`,
    label: 'Covid vaccinations',
    icon: covidVaccination,
  },
  { value: getSeverity(data.Climate_vulnerability), label: 'Climate vulnerability', icon: climateVulnerability },
  {
    value: getCountryResponsePlan(
      data['Country_response_plan_requirements_(US$,_million)'],
      data['Country_response_plan_coverage_(%)']
    ),
    label: 'Country response plan',
    icon: responsePlan,
  },
  {
    value: getRegionalResponsePlan(
      data['Regional_response_plan_requirements_(US$,_million)'],
      data['Regional_response_plan_funding_(US$,_million)']
    ),
    label: 'Regional response plan',
    icon: responsePlan,
  },
];

function renderPeopleAffectedByCrisisLeaflet() {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode).setView([20, -0.09], 2);
          const variable = 'Severity_score';
          let geojsonLayer;

          // Legend
          const legend = window.L.control({ position: 'topright' });
          legend.onAdd = onLegendAdd;
          legend.addTo(map);

          // data box
          const dataBox = window.L.control({ position: 'bottomright' });
          dataBox.onAdd = function () {
            this.div = window.L.DomUtil.create('div', 'databox'); // create a div with a class "databox"
            // this.div.setAttribute('data-id', 'databox');
            this.update();

            return this.div;
          };

          function onClose(e) {
            e.stopPropagation();
            dataBox.update();
          }

          dataBox.update = function (props) {
            this.div.innerHTML = props
              ? `<div>${
                  props.name
                } <button id=closeDatabox><img src=${closeIcon} height=20 width=20 ></img></button></div> <br> ${dataBoxContent(
                  props
                )
                  .map(
                    (item) =>
                      `<span><img src=${item.icon} height=20 width=20 ></img><p>${item.label}: ${item.value}</p> </span>`
                  )
                  .join('')}`
              : '';
            const closeButton = document.getElementById('closeDatabox');
            if (closeButton) {
              closeButton.addEventListener('click', (e) => onClose(e));
            }
          };

          const handleClick = (e) => {
            dataBox.addTo(map);
            const layer = e.target;
            dataBox.update(layer.feature.properties);
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

                const style = (feature) => ({
                  fillColor: getColor(feature.properties[variable]),
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
                  if (feature.properties[variable] || feature.properties[variable] === '') {
                    layer.on({
                      mouseover: (e) => highlightFeature(e, variable),
                      mouseout: resetHighlight,
                      click: handleClick,
                    });
                  }
                };

                // Add geojson layer to the map
                geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(geojsonData, groupedData), {
                  style,
                  onEachFeature,
                  maxZoom: 3,
                  minZoom: 2,
                }).addTo(map);
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
