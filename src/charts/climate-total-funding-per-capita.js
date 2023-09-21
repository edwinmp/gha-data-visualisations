import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH, sortedData } from '../utils/data';
import defaultOptions, { handleResize, legendSelection, getSymbolSizeRange, getScaledValue } from './echarts';
import { vulnerabilityLabelMapping } from '../utils/interactiveMap';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate-finance-bubble-data.csv`;

const seriesData = (data) =>
  sortedData(data, 'Funding per capita (US$)')
    .filter((item) => item.Region !== '#N/A')
    .map((d) => [Number(d.Vulnerability), d.Region, Number(d['Funding per capita (US$)']), d.Country]);

const renderDefaultChart = (chart, data) => {
  const symbolDataRange = getSymbolSizeRange(data, 'Funding per capita (US$)');
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[3]} <br/>
      Vulnerability: ${vulnerabilityLabelMapping(Number(params.data[0]) * 100)} <br/>
      Climate ODA per person: US$${Number(params.data[2]).toFixed(1)}
      `,
    },
    grid: { bottom: '10%', top: '20%', left: '2%' },
    xAxis: {
      name: 'Vulnerability level',
      nameLocation: 'center',
      nameTextStyle: {
        fontWeight: 'bold',
      },
      position: 'top',
      min: 0.4,
      max: 0.7,
      scale: true,
      nameGap: 25,
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      type: 'category',
      data: ['Oceania', 'Latin America and the Caribbean', 'Asia', 'Africa'],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['white', '#faf6f5'],
        },
      },
      axisLabel: {
        fontWeight: 'bold',
        formatter(value) {
          if (value === 'Latin America and the Caribbean') {
            return 'Latin America and\nthe Caribbean';
          }

          return value;
        },
      },
    },
    series: [
      {
        type: 'scatter',
        name: 'Protracted crisis',
        data: seriesData(data.filter((d) => d['Crisis Class'] === 'Protracted Crisis')),
        zlevel: 2,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#7e1850',
        },
        symbolSize(val) {
          return getScaledValue(val[2], 8, 80, symbolDataRange.min, symbolDataRange.max);
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
            color: '#df8000',
          },
        },
        markLine: {
          silent: true,
          symbol: 'none',
          label: { show: false },
          lineStyle: {
            color: '#cac5cb',
            type: 'solid',
          },
          data: [{ xAxis: 0.5 }, { xAxis: 0.55 }, { xAxis: 0.6 }],
          zlevel: 0,
        },
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
          },
          label: {
            fontFamily: 'Geomanist Regular,sans-serif',
            fontSize: 13,
            fontWeight: 'normal',
            color: '#7d7d7a',
          },
          data: [
            [
              { name: 'Low', xAxis: 0.4 },
              {
                xAxis: 0.5,
              },
            ],
            [
              { name: 'Medium', xAxis: 0.5 },
              {
                xAxis: 0.55,
              },
            ],
            [
              { name: 'High', xAxis: 0.55 },
              {
                xAxis: 0.6,
              },
            ],
            [
              { name: 'Very high', xAxis: 0.6 },
              {
                xAxis: 0.7,
              },
            ],
          ],
        },
      },
      {
        type: 'scatter',
        name: 'Other ODA recipients',
        data: seriesData(data.filter((d) => d['Crisis Class'] !== 'Protracted Crisis')),
        zlevel: 1,
        itemStyle: {
          opacity: 0.8,
          borderColor: 'black',
          color: '#f9cdd0',
        },
        symbolSize(val) {
          return getScaledValue(val[2], 8, 80, symbolDataRange.min, symbolDataRange.max);
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
            color: '#df8000',
          },
        },
        markLine: {
          silent: true,
          symbol: 'none',
          label: { show: false },
          lineStyle: {
            color: '#cac5cb',
            type: 'solid',
          },
          data: [{ xAxis: 0.5 }, { xAxis: 0.55 }, { xAxis: 0.6 }],
          zlevel: 0,
        },
        markArea: {
          silent: true,
          itemStyle: {
            color: 'transparent',
          },
          label: {
            fontFamily: 'Geomanist Regular,sans-serif',
            fontSize: 13,
            fontWeight: 'normal',
            color: '#7d7d7a',
          },
          data: [
            [
              { name: 'Low', xAxis: 0.4 },
              {
                xAxis: 0.5,
              },
            ],
            [
              { name: 'Medium', xAxis: 0.5 },
              {
                xAxis: 0.55,
              },
            ],
            [
              { name: 'High', xAxis: 0.55 },
              {
                xAxis: 0.6,
              },
            ],
            [
              { name: 'Very high', xAxis: 0.6 },
              {
                xAxis: 0.7,
              },
            ],
          ],
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

const renderClimateFundingPerCapitaChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-climate-funding-per-capita',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          const data = await fetchCSVData(DATA_URL);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, data);

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderClimateFundingPerCapitaChart;
