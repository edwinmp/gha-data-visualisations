import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH, sortedData } from '../utils/data';
import defaultOptions, { handleResize, legendSelection } from './echarts';
import { cleanPercentageValues, vulnerabilityLabelMapping } from '../utils/interactiveMap';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate-finance-bubble-data.csv`;

const seriesData = (data) =>
sortedData(data, 'Food Insecurity Gap')
    .filter(item => item.Region !== '#N/A' && item['Food Insecurity Gap']).map((d) => [Number(d.Vulnerability), Number( cleanPercentageValues(d['Food Insecurity Gap'])), Number(d.Adaptation), d.Country]);


const renderDefaultChart = (chart, data,) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[3]} <br/>
      Vulnerability: ${vulnerabilityLabelMapping(Number(params.data[0]) * 100) } <br/>
      Adaptation: $US${(Number(params.data[2])).toFixed(1)}million
      `,
    },
    grid: { bottom: '10%', top: '20%', left: '5%' },
    xAxis: {
      name: 'Vulnerability level',
      nameLocation: 'center',
      min: 0.5,
      max: 0.7,
      scale: true,
      nameGap: 25,
      position: 'top',
      axisLabel: {
        formatter(value) {
          if (value === 0.5) {
            return 'Low'
          }
          if (value === 0.7) {
            return 'High'
          }

          return ''
        },
        padding: [0, 0, 0, 30]
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      min: 0,
      max: 45,
      scale: true,
      name: 'Food insecurity gap',
      nameLocation: 'center',
      nameGap: 35,
      axisLabel: {
        formatter(value) {
          return `${value}%`
        }
      }
    },
    series: [
      {
        type: 'scatter',
        name:'Other ODA Recipients',
        data: seriesData(data.filter((d) => d['Crisis Class'] !== 'Protracted Crisis')),
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#f9cdd0'
        },
        symbolSize(val) {
          return (val[2])
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
            color: '#df8000',
          },
        },
      },
      {
        type: 'scatter',
        name:'Protracted Crisis',
        data: seriesData(data.filter((d) => d['Crisis Class'] === 'Protracted Crisis')),
        zlevel: 1,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#7e1850',
        },
        symbolSize(val) {
          return (val[2])
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
            color: '#df8000',
          },
        },
      },
    ],
  };
  chart.setOption(deepMerge(defaultOptions, option));
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};


const renderClimateFinanceFoodInsecureChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-climate-finance-food-insecure',
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

export default renderClimateFinanceFoodInsecureChart
