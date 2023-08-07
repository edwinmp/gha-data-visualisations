import React from 'react';
import { createRoot } from 'react-dom/client';
import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { handleResize } from './echarts';
import ChartFilters from '../components/ChartFilters';
import Select from '../components/Select';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const colors = ['#f49b21', '#feedd4', '#fccc8e', '#f9b865', '#e48a00', '#a85d00', '#7d4712'];
const filterOptions = [
  { value: 'Total_Climate_USD', label: 'USD millions' },
  { value: 'Total_Climate_Share', label: 'Percentage share' },
];
const requiredVariables = ['Total_Climate_USD', 'Total_Climate_Share', 'Vulnerability_Score'];

const groupedCountryData = (data, countries, years) => {
  const finalData = [];
  years.forEach((year) => {
    countries.forEach((country) => {
      const countryData = {};
      countryData.name = country;
      countryData.year = year;
      data.forEach((item) => {
        if (item.countryname === country && item.year === year) {
          countryData[item.variable] = item.value_fixed;
        }
      });
      finalData.push(countryData);
    });
  });

  return finalData;
};

const groupedSeriesData = (data, variable, years) =>
  years.map((year) => ({
    title: {
      text: year,
    },
    series: [
      {
        data: data
          .filter((item) => item.year === year)
          .map((d) => [Number(d[variable]), Number(d.Vulnerability_Score), d.name]),
      },
    ],
  }));

const renderDefaultChart = (chart, years, data) => {
  const option = {
    timeline: {
      axisType: 'category',
      orient: 'vertical',
      left: null,
      right: 0,
      top: 20,
      bottom: 20,
      width: 55,
      data: years,
    },
    color: colors,
    grid: { bottom: '10%', top: '20%' },
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'scatter',
        symbolSize(val) {
          return val[1];
        },
      },
    ],
    options: data,
  };

  chart.setOption(deepMerge(option, defaultOptions));

  return chart;
};

const renderClimateFundingChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--climate-funding',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          const defaultVariable = 'Total_Climate_USD';
          const data = await fetchCSVData(DATA_URL);
          const years = Array.from(new Set(data.map((d) => d.year)));

          const countries = Array.from(new Set(data.map((d) => d.countryname)));
          const filteredData = (csvData) => csvData.filter((item) => requiredVariables.includes(item.variable));
          const consolidatedData = groupedCountryData(filteredData(data), countries, years);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, years, groupedSeriesData(consolidatedData, defaultVariable, years));

          const filterWrapper = addFilterWrapper(chartNode);

          const onSelectFilter = (item) => {
            renderDefaultChart(
              chart,
              years,
              groupedSeriesData(consolidatedData, item.value ? item.value : defaultVariable, years)
            );
          };

          // create dropdowns
          const root = createRoot(filterWrapper);
          root.render(
            <ChartFilters>
              <Select
                classNamePrefix="climate-chart-select"
                label="Select value type"
                options={filterOptions}
                defaultValue={[{ value: 'Total_Climate_USD', label: 'USD millions' }]}
                onChange={onSelectFilter}
                css={{
                  minWidth: '150px',
                }}
              />
            </ChartFilters>
          );

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderClimateFundingChart;
