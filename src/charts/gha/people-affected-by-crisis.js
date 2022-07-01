import fetchCSVData from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';

const MAP_FILE_PATH = 'public/assets/data/GHA/2021/world_map.geo.json';
const CSV_PATH = 'public/assets/data/GHA/2021/map_data_long.csv';
let countries;
const dimensions = [
  { name: 'Severity_score', type: 'piecewise' },
  { name: 'Climate_vulnerability', type: 'piecewise' },
  { name: 'COVID_vaccination_rate', type: 'continuous' },
  { name: 'People_in_need_(millions)', type: 'continuous' },
];
const crisisTypes = [
  { label: 'Natural', name: 'Physical_disaster_marker' },
  { label: 'Displacement', name: 'Displacement_marker' },
  { label: 'Conflict', name: 'Conflict_marker' },
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

const processedData = (countryNames, processedCountryData) => {
  const data = [];
  // eslint-disable-next-line array-callback-return
  countryNames.map((country) => {
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

const getVisualmap = (type, variable) => {
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

  const maximumValue = variable === 'COVID_vaccination_rate' ? 100 : 25;

  return {
    type,
    calculable: true,
    left: 'center',
    padding: 100,
    top: 'top',
    selectedMode: false,
    orient: 'horizontal',
    inverse: true,
    min: 0,
    max: maximumValue,
  };
};

const getMoreCountryData = (data, country) => data.find(
  (countryData) => countryData.name === country,
);

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
    tooltip: {
      trigger: 'item',
      formatter: (obj) => {
        const countryName = obj.name;
        const allCountryData = getMoreCountryData(groupedData, countryName);
        const isIncluded = countries.find((country) => country === countryName);
        if (isIncluded) {
          return `<h3> ${countryName} </h3> <br>
          ${obj.seriesName}:  ${obj.value}
          <br> People in need(millions): ${allCountryData['People_in_need_(millions)']}`;
        }

        return '';
      },
    },
    visualMap: getVisualmap(
      dimensions.find((dimension) => dimension.name === variable).type,
      variable,
    ),
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
  chart.on('click', (params) => {
    const isIncluded = countries.find((country) => country === params.name);
    const countryDataElement = document.getElementById('country-data-tooltip');
    if (isIncluded) {
      const countryInfo = groupedData.find((data) => data.name === params.data.name);
      const countryInfoValuePairs = Object.entries(countryInfo);
      countryDataElement.innerHTML = countryInfoValuePairs.map((info) => `${info[0]}: ${info[1]}<br/>`);
      countryDataElement.style.display = 'inline-block';
      countryDataElement.style.fontFamily = 'Geomanist Regular,sans-serif';
      countryDataElement.style.padding = '10px';
      countryDataElement.style.borderStyle = 'solid';
      countryDataElement.style.borderWidth = '1px';
      countryDataElement.style.width = 'fit-content';
      countryDataElement.style.height = 'fit-content';
    }
    if (!params.data) {
      countryDataElement.style.display = 'none';
    }
  });
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
            let crisisType;
            let crisisClass;
            const chart = window.echarts.init(chartNode);
            const filterWrapper = addFilterWrapper(chartNode);

            const countryDataElement = document.createElement('div');
            countryDataElement.style.display = 'none';
            countryDataElement.setAttribute('id', 'country-data-tooltip');
            chartNode.parentElement.insertBefore(countryDataElement, chartNode);
            const dimensionsFilter = addFilter({
              wrapper: filterWrapper,
              options: dimensions.map((dimension) => dimension.name),
              className: 'dimension-filter',
              label: '<b>Select dimension</b>',
              defaultOption: 'Severity_score',
            });
            const crisisTypeFilter = addFilter({
              wrapper: filterWrapper,
              options: crisisTypes.map((crisis) => crisis.label),
              className: 'crisis-filter',
              label: '<b>Select crisis type</b>',
              defaultOption: '',
            });
            const recurrentCrisisClassFilter = addFilter({
              wrapper: filterWrapper,
              options: ['Recurrent', 'Protracted'],
              className: 'recurrent-crisis-class-filter',
              label: '<b>Select recurrent crisis class</b>',
              defaultOption: '',
            });

            const mapWrapper = document.createElement('div');
            mapWrapper.style.display = 'flex';
            chartNode.parentElement.insertBefore(mapWrapper, chartNode);
            mapWrapper.appendChild(chartNode);
            mapWrapper.appendChild(countryDataElement);

            dichart.showLoading();
            window.$.getJSON(MAP_FILE_PATH, (worldJson) => {
              const procesedCountryNameData = matchCountryNames(data, worldJson);
              countries = [
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
              crisisTypeFilter.addEventListener('change', (event) => {
                const { value } = event.currentTarget;
                crisisType = value;
                const actualCrisisName = crisisTypes.find(
                  (crisis) => crisis.label === crisisType,
                ).name;
                const filteredGroupedData = groupedData.filter(
                  (dataLine) => Number(dataLine[actualCrisisName]) === 1,
                );
                renderChart(chart, variable, filteredGroupedData);
              });
              recurrentCrisisClassFilter.addEventListener('change', (event) => {
                const { value } = event.currentTarget;
                crisisClass = value;
                const filteredGroupedData = groupedData.filter((dataStream) => dataStream['Protracted/Recurrent_crisis'] === crisisClass);
                renderChart(chart, variable, filteredGroupedData);
              });
            });
          });
        });
      },
    },
  });
};

export default renderPeopleAffectedByCrisisMap;
