/** @jsx jsx */
import { jsx } from '@emotion/react';
import deepMerge from 'deepmerge';
import { createRoot } from 'react-dom/client';
import DonorChartFilters from '../components/DonorChartFilters';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { colorways, getYAxisNamePositionFromSeries, handleResize, legendSelection } from './echarts';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/donor_interactive_data_long.csv`;

let dataType = 'Volumes';
const dataTypeMapping = {
  Proportions: 'Proportions',
  Volumes: 'Volumes',
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

const getSeriesType = () => (dataType === '%GNI' ? 'line' : 'bar');

const processData = (data, years, donor, channel, valueType = 'Proportions') => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d.Series === channel && d.Display === valueType);
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

const getYaxisValue = (namePosition = 'far') => {
  const paddingMapping = {
    near: [-35, 0, 0, 0],
    middle: [-45, 0, 0, 0],
    far: [-60, 0, 0, 0],
  };

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
      padding: paddingMapping[namePosition],
    },
    max: null,
  };
};

const renderDefaultChart = (chart, data, { years, channels }) => {
  const option = {
    color: colorways.sunflower,
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
    yAxis: getYaxisValue(),
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, 'All donors', channel, dataTypeMapping[dataType]).map((d) => ({
        value: d ? d.value : null,
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
              d.Series === channel &&
              d.Donor === 'All donors' &&
              `${d.Year}` === params.name &&
              d.Display === dataTypeMapping[dataType]
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
  option.yAxis = getYaxisValue(getYAxisNamePositionFromSeries(option.series));
  defaultOptions.toolbox.feature.saveAsImage.name = 'donors';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};

const updateChart = (chart, data, { donors, channels, years }) => {
  const cleanedData = cleanData(data);
  const type = getSeriesType();
  const series = donors
    .map((donor) =>
      channels.map((channel, index) => ({
        name: dataType !== '%GNI' ? channel : donor, // GNI only has one channel, so the donors are the series
        data: processData(cleanedData, years, donor, channel, dataTypeMapping[dataType]).map((d) => ({
          value: d && typeof d.value === 'number' ? d.value : null, // all other data types are %ages
          emphasis: {
            focus: 'self',
          },
        })),
        type,
        stack: dataType !== '%GNI' ? donor : undefined, // GNI line chart should not stack
        symbol: 'circle',
        symbolSize: 10,
        connectNulls: type === 'line' ? false : undefined,
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const item = cleanedData.find(
              (d) =>
                d.Series === channel &&
                d.Donor === donor &&
                `${d.Year}` === params.name &&
                d.Display === dataTypeMapping[dataType]
            );
            const value =
              dataType === 'Volumes'
                ? `US$${toDollars(cleanValue(item.Value), 'decimal', 'never')} million`
                : `${params.value.toFixed(2)}%`;

            return `${donor}, ${params.name} <br />${
              dataType === '%GNI' ? 'Total HA' : channel
            }: <strong>${value}</strong>`;
          },
        },
        label: {
          // only show single label that overlaps the stack
          show: type === 'bar' ? index === 0 && donors.length > 1 : false,
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
      yAxis: getYaxisValue(getYAxisNamePositionFromSeries(series)),
      series,
    },
    { replaceMerge: ['series'] }
  );
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
          fetchCSVData(DATA_URL).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = Array.from(new Set(data.map((d) => d.Donor))).sort();
            const years = Array.from(new Set(data.map((d) => d.Year))).sort();
            const channels = Array.from(new Set(data.map((d) => d.Series)));
            const donorSelectErrorMessage = 'You can compare two donors. Please remove one before adding another.';
            // create UI elements

            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            let selectedDonors = [];

            // add dropdown event listeners
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

            const onSelectDataType = (value) => {
              dataType = value || dataType;
              if (selectedDonors.length) {
                const filteredData = data.filter((d) => selectedDonors.includes(d.Donor));
                updateChart(chart, filteredData, { donors: selectedDonors, channels, years });
              } else {
                renderDefaultChart(chart, cleanData(data), { years, channels });
              }
            };

            const defaultDonor = 'All donors';

            // add dropdowns
            const root = createRoot(filterWrapper);
            root.render(
              <DonorChartFilters
                selectErrorMessage={donorSelectErrorMessage}
                donors={donors}
                onSelectDataType={onSelectDataType}
                onSelectDonor={onSelectDonor}
                defaultDonor={defaultDonor}
                defaultDataType="Volumes"
                donorSelectErrorMessage={donorSelectErrorMessage}
              />
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

export default renderDonorsChart;
