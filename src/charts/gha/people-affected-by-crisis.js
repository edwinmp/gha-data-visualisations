import fetchCSVData from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';
const dimensions = [
  { name: 'Severity_score', type: 'piecewise' },
  { name: 'Climate_vulnerability', type: 'piecewise' },
  { name: 'COVID_vaccination_rate', type: 'continuous' },
  { name: 'People_in_need_(millions)', type: 'continuous' },
];

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

const getVisualmap = (type) => {
  if (type === 'piecewise') {
    return {
      type,
      calculable: true,
      left: 'center',
      padding: 100,
      top: 'top',
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
      inverse: true,
    };
  }

  return {
    type,
    calculable: true,
    left: 'center',
    padding: 100,
    top: 'top',
    selectedMode: false,
    orient: 'horizontal',
    inverse: true,
  };
};

const renderChart = (chart, variable, groupedData) => {
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
    visualMap: getVisualmap(dimensions.find((dimension) => dimension.name === variable).type),
    series: [
      {
        name: variable,
        type: 'map',
        roam: 'move',
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
            let variable = 'Severity_score';
            const chart = window.echarts.init(chartNode);
            const filterWrapper = addFilterWrapper(chartNode);

            const dimensionsFilter = addFilter({
              wrapper: filterWrapper,
              options: dimensions.map((dimension) => dimension.name),
              className: 'dimension-filter',
              label: '<b>Select dimension</b>',
              defaultOption: 'Severity_score',
            });

            dichart.showLoading();
            window.$.getJSON(MAP_FILE_PATH, (worldJson) => {
              const procesedCountryNameData = matchCountryNames(data, worldJson);
              const countries = [
                ...new Set(procesedCountryNameData.map((stream) => stream.Country_name)),
              ];
              const groupedData = processedData(countries, procesedCountryNameData);

              dichart.hideLoading();
              window.echarts.registerMap('WORLD', worldJson);
              renderChart(chart, variable, groupedData);

              /**
              * Event Listeners/Handlers
              * */
              dimensionsFilter.addEventListener('change', (event) => {
                const { value } = event.currentTarget;
                variable = value;
                renderChart(chart, variable, groupedData);
              });
            });
          });
        });
      },
    },
  });
};

export default renderPeopleAffectedByCrisisMap;
