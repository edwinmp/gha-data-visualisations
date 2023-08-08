import React from 'react';
import { createRoot } from 'react-dom/client';
import deepMerge from 'deepmerge';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { handleResize } from './echarts';
import ChartFilters from '../components/ChartFilters';
import Select from '../components/Select';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/climate_funding_data_long_format.csv`;
const filterOptions = [
  { value: 'Total_Climate_USD', label: 'USD millions' },
  { value: 'Total_Climate_Share', label: 'Percentage share' },
];
const requiredVariables = ['Total_Climate_USD', 'Total_Climate_Share', 'Vulnerability_Score'];
const countryFilterOptions = (countryList) =>
  [{ value: 'all', label: 'All' }].concat(countryList.map((country) => ({ value: country, label: country })));

const groupedCountryData = (data, countries, years, countryName) => {
  const finalData = [];
  if (countryName === 'all') {
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
  } else {
    years.forEach((year) => {
      const countryData = {};
      countryData.name = countryName;
      countryData.year = year;
      data.forEach((item) => {
        if (item.countryname === countryName && item.year === year) {
          countryData[item.variable] = item.value_fixed;
        }
      });
      finalData.push(countryData);
    });
  }

  return finalData;
};

const groupedSeriesData = (data, variable, years) =>
  years.map((year) => ({
    series: [
      {
        data: data
          .filter((item) => item.year === year)
          .map((d) => [Number(d[variable]), Number(d.Vulnerability_Score), d.name]),
      },
    ],
  }));

const renderDefaultChart = (chart, years, data, variable) => {
  const option = {
    timeline: {
      axisType: 'category',
      orient: 'horizontal',
      top: 20,
      bottom: 20,
      data: years,
      lineStyle: {
        color: '#f49b21',
      },
      label: {
        position: 10,
      },
      tooltip: {
        show: false,
      },
      itemStyle: {
        color: '#f49b21',
      },
      checkpointStyle: {
        color: '#7d4712',
      },
      progress: {
        lineStyle: {
          color: '#7d4712',
        },
        itemStyle: {
          color: '#7d4712',
        },
      },
      controlStyle: {
        show: false,
      },
      emphasis: {
        itemStyle: {
          color: '#7d4712',
        },
      },
    },
    visualMap: {
      type: 'continuous',
      min: 0,
      max: 65,
      textGap: 5,
      dimension: 1,
      text: ['65', '0'],
      inRange: {
        color: ['#feedd4', '#fee7c1', '#fedcab', '#fac47e', '#f7a838', '#df8000', '#ba6b15', '#7d4712'],
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => `${params.data[2]} <br/>
      Vulnerability score: ${params.data[1]} <br/>
      ${filterOptions.find((item) => item.value === variable).label}: ${params.data[0]} ${
        variable === 'Total_Climate_USD' ? 'million' : '%'
      }
      `,
    },
    grid: { bottom: '10%', top: '20%' },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      {
        type: 'scatter',
        itemStyle: {
          borderColor: '#7d4712',
          opacity: 1,
        },
        emphasis: {
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2.5,
          },
        },
        symbolSize(val) {
          if (variable === 'Total_Climate_USD') {
            return Math.sqrt(val[0]) * 5;
          }

          return val[0] * 2;
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

          let variable = 'Total_Climate_USD';
          let country = 'all';
          const data = await fetchCSVData(DATA_URL);
          const years = Array.from(new Set(data.map((d) => d.year)));

          const countries = Array.from(new Set(data.map((d) => d.countryname)));
          const filteredData = (csvData) => csvData.filter((item) => requiredVariables.includes(item.variable));
          let consolidatedData = groupedCountryData(filteredData(data), countries, years, country);

          // create UI elements

          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, years, groupedSeriesData(consolidatedData, variable, years), variable);

          const filterWrapper = addFilterWrapper(chartNode);

          const onSelectFilter = (item) => {
            variable = item.value ? item.value : variable;
            consolidatedData = groupedCountryData(filteredData(data), countries, years, country);
            renderDefaultChart(chart, years, groupedSeriesData(consolidatedData, variable, years), variable);
          };

          const onSelectCountry = (item) => {
            country = item.value ? item.value : 'all';
            consolidatedData = groupedCountryData(filteredData(data), countries, years, country);
            renderDefaultChart(chart, years, groupedSeriesData(consolidatedData, variable, years), variable);
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
              <Select
                classNamePrefix="climate-chart-country-select"
                label="Select country"
                options={countryFilterOptions(countries)}
                defaultValue={[{ value: 'all', label: 'All' }]}
                onChange={onSelectCountry}
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
