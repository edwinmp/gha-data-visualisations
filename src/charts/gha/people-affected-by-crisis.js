import fetchCSVData from '../../utils/data';

const MAP_FILE_PATH = 'src/charts/data/world_map.geo.json';
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/charts/public/assets/data/GHA/2021/interactivity-donors.csv';
          fetchCSVData(csv).then((data) => {
            // create UI elements
            console.log(data);

            const chart = window.echarts.init(chartNode);

            dichart.showLoading();
            window.$.getJSON(MAP_FILE_PATH, (worldJson) => {
              dichart.hideLoading();
              window.echarts.registerMap('WORLD', worldJson);
              console.log(worldJson);
              const option = {
                title: {
                  text: 'People affected by crisis',
                  left: 'center',
                  textStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                  },
                },
                series: [
                  {
                    name: 'Severity score',
                    type: 'map',
                    roam: true,
                    map: 'WORLD',
                    emphasis: {
                      label: {
                        show: true,
                      },
                    },
                    showLegendSymbol: false,
                    data: [
                      { name: 'Yemen', value: 4 },
                      { name: 'Dem. Rep. Congo', value: 4 },
                      { name: 'Venezuela', value: 3 },
                      { name: 'Afghanistan', value: 4 },
                      { name: 'Syria', value: 5 },
                      { name: 'Dem. Rep. Korea', value: 4 },
                      { name: 'Nigeria', value: 4 },
                      { name: 'Sudan', value: 5 },
                      { name: 'Colombia', value: 4 },
                      { name: 'Ethiopia', value: 5 },
                      { name: 'S. Sudan', value: 4 },
                      { name: 'Zimbabwe', value: 3 },
                      { name: 'Chad', value: 4 },
                      { name: 'Somalia', value: 5 },
                      { name: 'Iraq', value: 4 },
                    ],
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
