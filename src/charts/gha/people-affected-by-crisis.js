import fetchCSVData from '../../utils/data';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';

const matchCountryNames = (csvData, worldData) => {
  const matchedData = csvData.map((stream) => {
    const countryObject = worldData.features.find(
      (feature) => feature.properties.iso_a3 === stream.Country_ID,
    );
    if (countryObject) {
      // eslint-disable-next-line no-param-reassign
      stream.Country_name = countryObject.properties.name;
    }

    return stream;
  });

  return matchedData;
};
const getVariableSpecificData = (dataArray, variableName) => (
  dataArray.map((values) => ({
    name: values.name,
    value: values[variableName],
  })));

const processedData = (countries, processedCountryData) => {
  const data = [];
  // eslint-disable-next-line array-callback-return
  countries.map((country) => {
    const countryData = {};
    countryData.name = country;
    // eslint-disable-next-line array-callback-return
    processedCountryData.map((stream) => {
      if (stream.Country_name === country) {
        countryData[stream.variable] = stream.value;
      }
    });
    data.push(countryData);
  });

  return data;
};

const renderPeopleAffectedByCrisisMap = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-people-affected-by-crisis',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          fetchCSVData(CSV_PATH).then((data) => {
            // create UI elements
            const variable = 'Severity_score';

            const chart = window.echarts.init(chartNode);

            dichart.showLoading();
            window.$.getJSON(MAP_FILE_PATH, (worldJson) => {
              const procesedCountryNameData = matchCountryNames(data, worldJson);
              const countries = [
                ...new Set(procesedCountryNameData.map((stream) => stream.Country_name)),
              ];
              const groupedData = processedData(countries, procesedCountryNameData);
              dichart.hideLoading();
              window.echarts.registerMap('WORLD', worldJson);
              const option = {
                title: {
                  text: 'People affected by crisis',
                  left: 'center',
                  textStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                  },
                },
                tooltip: {},
                visualMap: {
                  type: 'piecewise',
                  calculable: true,
                  pieces: [
                    {
                      min: 5, max: 5, label: '5 - Very High', color: '#6a033b',
                    },
                    {
                      min: 4, max: 4, label: '4 - High', color: '#a71a67',
                    },
                    {
                      min: 3, max: 3, label: '3 - Medium', color: '#bc4084',
                    },
                    {
                      min: 2, max: 2, label: '2 - Low', color: '#e288b9',
                    },
                    {
                      min: 1, max: 1, label: '1 - Very Low', color: '#e6a9ca',
                    },
                  ],
                  selectedMode: false,
                  orient: 'horizontal',
                },
                series: [
                  {
                    name: variable,
                    type: 'map',
                    roam: true,
                    map: 'WORLD',
                    emphasis: {
                      label: {
                        show: true,
                      },
                    },
                    showLegendSymbol: false,
                    data: getVariableSpecificData(groupedData, variable),
                  },
                ],
              };
              chart.setOption(option);
            });
          });
        });
      },
    },
  });
};

export default renderPeopleAffectedByCrisisMap;
