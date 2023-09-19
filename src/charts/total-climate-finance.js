import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH, sortedData } from '../utils/data';
import defaultOptions, { handleResize, legendSelection } from './echarts';
import { vulnerabilityLabelMapping } from '../utils/interactiveMap';


const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/Climate_Finance_Dataset.csv`;

const seriesData = (data) =>
  sortedData(data, 'Total Climate Funding')
    .filter(item => item['GNR Region'] !== '#N/A').map((d) => [Number(d.Vulnerability), d['GNR Region'], Number(d['Total Climate Funding']), d.Country]);


const renderDefaultChart = (chart, data,) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[3]} <br/>
      Vulnerability: ${vulnerabilityLabelMapping(Number(params.data[0]) * 100) } <br/>
      Total climate finance: $${Number(params.data[2]).toFixed(1)} million
      `,
    },
    grid: { bottom: '10%', top: '20%', left: '5%' },
    xAxis: {
      name: 'Vulnerability level (Low to Very high)',
      nameLocation: 'center',
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
      splitArea: {
        show: true,
        areaStyle: {
          color: [ 'white', '#faf6f5',]
        }
      },
      axisLabel: {
        formatter(value) {
          if (value === 'Latin America and the Caribbean') {
            return 'LAC'
          }

          return value
        }
      }
    },
    series: [

      {
        type: 'scatter',
        name:'Developing Countries',
        data: seriesData(data.filter((d) => d.PC !== 'PC')),
        zlevel: 1,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#f9cdd0'
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
        // zlevel: 2,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#7e1850',
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
    ],
  };
  chart.setOption(deepMerge(defaultOptions, option));
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });
  chart.on('mouseover', {seriesName: 'Developing Countries'}, (params) =>{
    console.log(params)
  })

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
