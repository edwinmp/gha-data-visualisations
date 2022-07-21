import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';

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
    default:
      return '#E6E1E5';
  }
};

const highlightFeature = (e) => {
  const layer = e.target;

  layer.setStyle({
    fillColor: 'yellow',
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer.bindPopup(layer.feature.properties.name).openPopup();
};

const onLegendAdd = () => {
  const div = window.L.DomUtil.create('div', 'legend');
  const legendData = [
    { score: '5', label: '5 - Very High' },
    { score: '4', label: '4 - High' },
    { score: '3', label: '3 - Medium' },
    { score: '2', label: '2 - Low' },
    { score: '1', label: '1 - Very Low' },
  ];

  const legendContent = legendData
    .map((data) => `<span><i style="background:${getColor(data.score)}"></i><label>${data.label}</label></span>`)
    .join('');
  div.innerHTML = legendContent;

  return div;
};

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
                  if (feature.properties[variable]) {
                    layer.on({
                      mouseover: highlightFeature,
                      mouseout: resetHighlight,
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
