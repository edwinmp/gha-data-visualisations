import deepMerge from 'deepmerge';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ChartFilters from '../components/ChartFilters';
import Select from '../components/Select';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { colorways, handleResize, legendSelection } from './echarts';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/funding-channels-interactive-data.csv`;

const cleanValue = (value = '') =>
  value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()) : null;

const cleanData = (data) =>
  data.map((d) => {
    const clean = { ...d };
    clean.value = cleanValue(d.Proportions);

    return clean;
  });

const processData = (data, years, donor, channel) => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['Delivery channel'] === channel);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year));

  return sortedData;
};

const toDollars = (value, style = 'currency', signDisplay = 'auto') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    signDisplay,
    maximumFractionDigits: 0,
  });

  return formatter.format(value);
};

const sortOrgTypes = (orgTypes) => {
  const trailingOrgTypes = ['Not reported', 'Other'];
  const sortedOrgTypes = orgTypes.filter((type) => !trailingOrgTypes.includes(type));

  trailingOrgTypes.forEach((type) => {
    if (orgTypes.includes(type)) {
      sortedOrgTypes.push(type);
    }
  });

  return sortedOrgTypes;
};

const renderDefaultChart = (chart, data, { years, channels }) => {
  const option = {
    color: colorways.bluebell,
    legend: {
      show: true,
      top: 'top',
      padding: [20, 10, 5, 10],
      textStyle: {
        fontSize: '1.3rem',
      },
    },
    grid: { bottom: '10%', top: '20%' },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      max: 100,
    },
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, 'All donors', channel).map((d) => ({
        value: d && Number(d.value * 100).toFixed(2),
        emphasis: {
          focus: 'self',
        },
      })),
      type: 'bar',
      stack: 'channels',
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = data.find(
            (d) => d['Delivery channel'] === channel && d.Donor === 'All donors' && `${d.Year}` === params.name
          );

          return `All donors, ${params.name} <br />${channel}: <strong>${Number(params.value, 10).toFixed(
            2
          )}%</strong> (US$${toDollars(
            cleanValue(item['US$ millions, constant 2020 prices']),
            'decimal',
            'never'
          )} million)`;
        },
      },
      cursor: 'auto',
    })),
  };
  defaultOptions.toolbox.feature.saveAsImage.name = 'funding-channels';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};

const updateChart = (chart, data, { donors, channels, years }) => {
  const cleanedData = cleanData(data);
  const series = donors
    .map((donor) =>
      channels.map((channel, index) => ({
        name: channel,
        data: processData(cleanedData, years, donor, channel).map((d) => ({
          value: d && Number(d.value * 100).toFixed(2),
          emphasis: {
            focus: 'self',
          },
        })),
        type: 'bar',
        stack: donor,
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const item = cleanedData.find(
              (d) => d['Delivery channel'] === channel && d.Donor === donor && `${d.Year}` === params.name
            );
            const value = item
              ? `<strong>${(item.value * 100).toFixed(2)}%</strong> (US$${toDollars(
                  cleanValue(item['US$ millions, constant 2020 prices']),
                  'decimal',
                  'never'
                )} million)`
              : `<strong>${(item.value * 100).toFixed(2)}%</strong>`;

            return `${donor}, ${params.name} <br />${channel}: ${value}`;
          },
        },
        label: {
          // only show single label that overlaps the stack
          show: index === 0 && donors.length > 1,
          position: 'insideBottom',
          distance: 15,
          align: 'left',
          verticalAlign: 'middle',
          rotate: 90,
          formatter: () => `${donor}`,
          fontSize: 16,
        },
        cursor: 'auto',
      }))
    )
    .reduce((final, cur) => final.concat(cur), []);
  chart.setOption({ series }, { replaceMerge: ['series'] });
};

/**
 * Run your code after the page has loaded
 */
const renderFundingChannelsChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--boilerplate-chart',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          fetchCSVData(DATA_URL).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = Array.from(new Set(data.map((d) => d.Donor)));
            const years = Array.from(new Set(data.map((d) => d.Year)));
            const channels = sortOrgTypes(Array.from(new Set(data.map((d) => d['Delivery channel']))));
            const donorSelectErrorMessage = 'You can compare two donors. Please remove one before adding another.';

            // create UI elements

            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            let selectedDonors = [];

            // add dropdown event handlers
            const onSelectDonor = (values) => {
              if (!values.length) {
                renderDefaultChart(chart, cleanData(data), { years, channels });

                return;
              }
              // filter data to return only the selected items
              const filteredData = data.filter((d) => values.find((item) => item.value === d.Donor));
              selectedDonors = values.map((item) => item.value);
              updateChart(chart, filteredData, { donors: selectedDonors, channels, years });
            };

            const defaultDonor = 'All donors';

            // add dropdowns
            const root = createRoot(filterWrapper);
            root.render(
              <ChartFilters selectErrorMessage={donorSelectErrorMessage}>
                <Select
                  label="Select up to two donors"
                  options={donors.map((donor) => ({ value: donor, label: donor, isCloseable: true }))}
                  defaultValue={[{ value: defaultDonor, label: defaultDonor, isCloseable: true }]}
                  isMulti
                  onChange={onSelectDonor}
                  // singleSelectOptions={[{ value: defaultDonor, label: defaultDonor, isCloseable: false }]}
                  css={{ minWidth: '200px' }}
                  classNamePrefix="channels-chart-select"
                  isClearable={false}
                />
              </ChartFilters>
            );

            dichart.hideLoading();

            // add responsiveness
            handleResize(chart, chartNode);
          });
        });
      },
    },
  });
};

export default renderFundingChannelsChart;
