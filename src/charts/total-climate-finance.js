import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import defaultOptions, { handleResize } from './echarts';


const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/Climate_Finance_Dataset.csv`;

const seriesData = (data) =>
  data
    .filter(item => item['GNR Region'] !== '#N/A').map((d) => [Number(d.Vulnerability), d['GNR Region'], Number(d['Total Climate Funding']), d.Country]);


const renderDefaultChart = (chart, data,) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[3]} <br/>
      Vulnerability score: ${params.data[0]} <br/>
      `,
    },
    grid: { bottom: '10%', top: '20%', left: 0 },
    xAxis: {
      name: 'Vulnerability level',
      nameLocation: 'center',
      min: 0.4,
      max: 0.7,
      scale: true,
      nameGap: 25,
    },
    yAxis: {
      type: 'category',
      data: ['Oceania','Latin America and the Caribbean', 'Asia', 'Africa' ],
      // show: false,
      axisLine: {
        show: false
      }
    },
    series: [

      {
        type: 'scatter',
        name:'Developing Countries',
        data: seriesData(data.filter((d) => d.PC !== 'PC')),
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#facbad'
        },
        symbolSize(val) {
          if (Math.round(val[2]) !== 0){
            return (Math.log(Math.round(val[2])))*5
          }

            return val[2]
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
          },
        },
      },
      {
        type: 'scatter',
        name:'Protracted Crisis',
        data: seriesData(data.filter((d) => d.PC === 'PC')),
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#cb5730',
        },
        symbolSize(val) {

          if (Math.round(val[2]) !== 0){
            return (Math.log(Math.round(val[2])))*5
          }

            return val[2]
        },
        // symbolOffset: [0, '-50%'],
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
          },
        },
      },
    ],
  };

  chart.setOption(deepMerge(defaultOptions, option));

  return chart;
};


const renderTotalClimateFinanceChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-total-climate-finance',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          const data = await fetchCSVData(DATA_URL);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderDefaultChart(
            chart,
            data
          );

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderTotalClimateFinanceChart
