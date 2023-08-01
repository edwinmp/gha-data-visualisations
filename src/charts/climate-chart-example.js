import deepMerge from 'deepmerge';
import defaultOptions, { handleResize } from './echarts';

const colors = ['#f49b21', '#feedd4', '#fccc8e', '#f9b865', '#e48a00', '#a85d00', '#7d4712'];
const originalData = [
  [10, 45],
  [8, 135],
  [12, 270],
  [50, 100],
];

const renderChart = (chart) => {
  const option = {
    color: colors,
    legend: {
      show: true,
      top: 'top',
      padding: [20, 10, 5, 10],
      textStyle: {
        fontSize: '1.3rem',
      },
    },
    grid: {},
    polar: {
      radius: '80%',
    },
    angleAxis: {
      startAngle: 90,
      // clockwise: false,
    },
    radiusAxis: {
      // min: 0,
      // max: 12,
      // data: ['a', 'b', 'c', 'd'],
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: {
      data: originalData,
      coordinateSystem: 'polar',
      symbolSize: (value) => {
        console.log(value);

        return value[0];
      },
      type: 'scatter',
      tooltip: {
        trigger: 'item',
      },
      cursor: 'auto',
    },
  };
  chart.setOption(deepMerge(option, defaultOptions));

  return chart;
};
const renderCimateChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--climate-chart',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderChart(chart);

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderCimateChart;
