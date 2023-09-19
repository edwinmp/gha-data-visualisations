import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH, sortedData } from '../utils/data';
import defaultOptions, { handleResize, legendSelection } from './echarts';
import { cleanPercentageValues, vulnerabilityLabelMapping } from '../utils/interactiveMap';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate-finance-bubble-data.csv`;

const seriesData = (data) =>
  sortedData(data, 'Adaptation Share')
    .filter(item => item.Region !== '#N/A').map((d) => [Number(d.Vulnerability), d.Region, Number(cleanPercentageValues(d['Adaptation Share'])), d.Country]);


const renderDefaultChart = (chart, data,) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[3]} <br/>
      Vulnerability: ${vulnerabilityLabelMapping(Number(params.data[0]) * 100) } <br/>
      Adaptation share: ${(Number(params.data[2])).toFixed(1)}%
      `,
    },
    grid: { bottom: '10%', top: '20%', left: '5%' },
    xAxis: {
      name: 'Vulnerability level',
      nameLocation: 'center',
      position: 'top',
      min: 0.4,
      max: 0.7,
      scale: true,
      nameGap: 25,
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: ['Oceania','Latin America and the Caribbean', 'Asia', 'Africa' ],
      axisLabel: {
        formatter(value) {
          if (value === 'Latin America and the Caribbean') {
            return 'LAC'
          }

          return value
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [ 'white', '#faf6f5',]
        }
      },
    },
    series: [

      {
        type: 'scatter',
        name:'Developing Countries',
        data: seriesData(data.filter((d) => d['Crisis Class'] !== 'Protracted Crisis')),
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#f9cdd0'
        },
        symbolSize(val) {
          return (val[2])/2
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
        data: seriesData(data.filter((d) => d['Crisis Class'] === 'Protracted Crisis')),
        zlevel:1,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#7e1850',
        },
        symbolSize(val) {
          return (val[2])/2
        },
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
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};


const renderClimateAdaptationFundingChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-climate-adaptation-funding',
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

export default renderClimateAdaptationFundingChart
