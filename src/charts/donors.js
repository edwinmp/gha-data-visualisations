/** @jsx jsx */
import { jsx } from '@emotion/react';
import deepMerge from 'deepmerge';
import { createRoot } from 'react-dom/client';
import Select from '../components/Select';
import ChartFilters from '../components/ChartFilters';
import fetchCSVData from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { colorways, legendSelection } from './echarts';

let dataType = 'Volumes';
const dataTypeMapping = {
  Proportions: 'Proportional',
  Volumes: 'Absolute',
  '%GNI': '%GNI',
};

const cleanValue = (value = '') =>
  value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()) : null;

const cleanData = (data) =>
  data.map((d) => {
    const clean = { ...d };
    clean.value = cleanValue(clean.Value);

    return clean;
  });

const filterChannels = (channels) =>
  channels.filter((c) => (dataType === '%GNI' ? c === 'Total HA' : c !== 'Total HA'));

const getSeriesType = () => (dataType === '%GNI' ? 'line' : 'bar');

const processData = (data, years, donor, channel, valueType = 'Proportion') => {
  const filteredData = data.filter(
    (d) => d.Donor.trim() === donor && d['IHA type'] === channel && d['Value type'] === valueType
  );
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

const getYaxisValue = () => {
  if (dataType !== 'Volumes') {
    return {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      name: '',
      max: dataType === 'Proportions' ? 100 : null,
    };
  }

  return {
    type: 'value',
    axisLabel: { formatter: '{value}' },
    nameRotate: 90,
    name: 'US$ millions',
    nameLocation: 'end',
    nameTextStyle: {
      verticalAlign: 'top',
      align: 'right',
      padding: [-58, 0, 0, 0],
    },
    max: null,
  };
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
    grid: { bottom: '10%' },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: getYaxisValue(),
    series: filterChannels(channels).map((channel) => ({
      name: channel,
      data: processData(data, years, 'All donors', channel, dataTypeMapping[dataType]).map((d) => ({
        value: d && Number(dataType === 'Proportions' ? d.value * 100 : d.value),
        emphasis: {
          focus: 'self',
        },
      })),
      type: getSeriesType(),
      stack: 'channels',
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = data.find(
            (d) =>
              d['IHA type'] === channel &&
              d.Donor === 'All donors' &&
              `${d.Year}` === params.name &&
              d['Value type'] === dataTypeMapping[dataType]
          );
          const updatedOrgType = channel.includes('Multilateral HA')
            ? channel.replace('Multilateral HA', 'Multilateral Humanitarian Assistance')
            : channel;

          return `All donors, ${params.name} <br />${updatedOrgType}: <strong>${
            dataType === 'Proportions'
              ? `${params.value.toFixed(2)}%`
              : `US$${toDollars(cleanValue(item.Value), 'decimal', 'never')} million`
          } </strong>`;
        },
      },
      cursor: 'auto',
    })),
  };
  defaultOptions.toolbox.feature.saveAsImage.name = 'donors';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};

/**
 * Run your code after the page has loaded
 */
const renderDonorsChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-donors',
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
          const csv =
            'https://raw.githubusercontent.com/devinit/gha-data-visualisations/main/public/assets/data/donor_interactive_data_long.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = Array.from(new Set(data.map((d) => d.Donor)));
            const years = Array.from(new Set(data.map((d) => d.Year)));
            const channels = Array.from(new Set(data.map((d) => d['IHA type'])));
            const donorSelectErrorMessage = 'You can compare two donors. Please remove one before adding another.';
            // create UI elements

            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            const updateChartForDonorSeries = (updatedData, activeDonors) => {
              const cleanedData = cleanData(updatedData);
              const type = getSeriesType();
              const series = activeDonors
                .map((donor) =>
                  filterChannels(channels).map((channel, index) => ({
                    name: dataType !== '%GNI' ? channel : donor, // GNI only has one channel, so the donors are the series
                    data: processData(cleanedData, years, donor, channel, dataTypeMapping[dataType]).map((d) => ({
                      value: d && Number(dataType !== 'Volumes' ? d.value * 100 : d.value), // all other data types are %ages
                      emphasis: {
                        focus: 'self',
                      },
                    })),
                    type,
                    stack: dataType !== '%GNI' ? donor : undefined, // GNI line chart should not stack
                    symbol: 'circle',
                    tooltip: {
                      trigger: 'item',
                      formatter: (params) => {
                        const item = cleanedData.find(
                          (d) =>
                            d['IHA type'] === channel &&
                            d.Donor === donor &&
                            `${d.Year}` === params.name &&
                            d['Value type'] === dataTypeMapping[dataType]
                        );
                        const value =
                          dataType === 'Volumes'
                            ? `US$${toDollars(cleanValue(item.Value), 'decimal', 'never')} million`
                            : `${params.value.toFixed(2)}%`;

                        return `${donor}, ${params.name} <br />${channel}: <strong>${value}</strong>`;
                      },
                    },
                    label: {
                      // only show single label that overlaps the stack
                      show: type === 'bar' ? index === 0 && activeDonors.length > 1 : false,
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
              chart.setOption(
                {
                  yAxis: getYaxisValue(),
                  series,
                },
                { replaceMerge: ['series'] }
              );
            };

            let selectedDonors = [];

            const onSelectDonor = (values) => {
              const isAllDonors = values.find((item) => item.value === 'All donors');

              if (!values.length || isAllDonors) {
                renderDefaultChart(chart, cleanData(data), { years, channels });

                return;
              }
              // filter data to return only the selected items
              const filteredData = data.filter((d) => values.find((item) => item.value === d.Donor));
              selectedDonors = values.map((item) => item.value);
              updateChartForDonorSeries(filteredData, selectedDonors);
            };

            const onSelectDataType = (value) => {
              dataType = value.value || dataType;
              if (selectedDonors.length) {
                const filteredData = data.filter((d) => selectedDonors.includes(d.Donor));
                updateChartForDonorSeries(filteredData, selectedDonors);
              } else {
                renderDefaultChart(chart, cleanData(data), { years, channels });
              }
            };

            const defaultDonor = 'All donors';

            const root = createRoot(filterWrapper);
            root.render(
              <ChartFilters selectErrorMessage={donorSelectErrorMessage}>
                <Select
                  label="Select up to 2 donors"
                  options={donors.map((donor) => ({ value: donor, label: donor, isCloseable: donor !== defaultDonor }))}
                  defaultValue={[{ value: defaultDonor, label: defaultDonor }]}
                  isMulti
                  onChange={onSelectDonor}
                  singleSelectOptions={[{ value: defaultDonor, label: defaultDonor, isCloseable: false }]}
                  css={{ minWidth: '200px' }}
                />
                <Select
                  label="Display data as"
                  options={['Volumes', 'Proportions', '%GNI'].map((item) => ({ value: item, label: item }))}
                  defaultValue={[{ value: 'Volumes', label: 'Volumes' }]}
                  onChange={onSelectDataType}
                  css={{ minWidth: '150px' }}
                />
              </ChartFilters>
            );

            dichart.hideLoading();
          });
        });
      },
    },
  });
};

export default renderDonorsChart;