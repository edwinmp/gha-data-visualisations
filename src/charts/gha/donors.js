import deepMerge from 'deepmerge';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Select from '../../components/Select';
import ChartFilters from '../../components/ChartFilters';
import fetchCSVData from '../../utils/data';
import { addFilterWrapper } from '../../widgets/filters';
import defaultOptions, { colorways, legendSelection } from '../echarts';

const dataType = 'Volumes';
const dataTypeMapping = {
  Proportions: 'Proportion',
  Volumes: 'Volume',
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
  if (dataType === 'Proportions') {
    return {
      type: 'value',
      axisLabel: { formatter: '{value}%' },
      name: '',
      max: 100,
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
            // const countryFilter = addFilter(
            //   {
            //     wrapper: filterWrapper,
            //     options: donors.sort(),
            //     className: 'country-filter',
            //     label: '<b>Select up to 2 donors</b>',
            //   },
            //   false,
            //   'donorSelectError',
            //   donorSelectErrorMessage
            // );

            // const contextFilter = addFilter({
            //   wrapper: filterWrapper,
            //   options: ['Volumes', 'Proportions', '%GNI'],
            //   className: 'data-filter',
            //   label: '<b>Display data as</b>',
            // });

            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            // initialise pill widget for the multi-select option
            // const pillWidget = new PillWidget({ wrapper: filterWrapper });
            // if (pillWidget.pills.length) {
            //   chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            // }

            const updateChartForDonorSeries = (updatedData, activeDonors) => {
              const cleanedData = cleanData(updatedData);
              const type = getSeriesType();
              const series = activeDonors
                .map((donor) =>
                  filterChannels(channels).map((channel, index) => ({
                    name: channel,
                    data: processData(cleanedData, years, donor, channel, dataTypeMapping[dataType]).map((d) => ({
                      value: d && Number(dataType === 'Proportions' ? d.value * 100 : d.value),
                      emphasis: {
                        focus: 'self',
                      },
                    })),
                    type,
                    stack: donor,
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
                          dataType !== 'Proportions'
                            ? `US$${toDollars(cleanValue(item.Value), 'decimal', 'never')} million`
                            : `${params.value.toFixed(2)}${dataType === 'Proportions' ? '%' : ''}`;

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

            const onAdd = (values) => {
              const isAllDonors = values.find((item) => item.value === 'All donors');

              if (!values.length || isAllDonors) {
                renderDefaultChart(chart, cleanData(data), { years, channels });

                return;
              }
              // filter data to return only the selected items
              const filteredData = data.filter((d) => values.find((item) => item.value === d.Donor));
              const selectedDonors = values.map((item) => item.value);
              updateChartForDonorSeries(filteredData, selectedDonors);
            };

            const root = createRoot(filterWrapper);
            root.render(
              <ChartFilters selectErrorMessage={donorSelectErrorMessage}>
                <Select
                  label="Select up to 2 donors"
                  options={donors.map((donor) => ({ value: donor, label: donor }))}
                  defaultValue={[{ value: 'All donors', label: 'All donors' }]}
                  isMulti
                  onChange={onAdd}
                  singleSelectOptions={[{ value: 'All donors', label: 'All donors' }]}
                />
              </ChartFilters>
            );

            /**
             * Event Listeners/Handlers
             * */
            // countryFilter.addEventListener('change', (event) => {
            //   const { value } = event.currentTarget;
            //   const error = document.getElementById('donorSelectError');
            //   if (value !== 'All donors') {
            //     // if it's the first pill, append pill widget
            //     if (!pillWidget.pillNames.length) {
            //       chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            //     }
            //     if (pillWidget.pillNames.length >= 2) {
            //       error.style.display = 'block';
            //     } else {
            //       pillWidget.add(value);
            //       error.style.display = 'none';
            //     }
            //   } else {
            //     pillWidget.removeAll();
            //   }
            // });

            // contextFilter.addEventListener('change', (event) => {
            //   const { value } = event.currentTarget;
            //   dataType = value;
            //   if (pillWidget.pillNames.length > 1) {
            //     const filteredData = data.filter((d) => pillWidget.pillNames.includes(d.Donor));
            //     updateChartForDonorSeries(filteredData, pillWidget.pillNames);
            //   } else {
            //     renderDefaultChart(chart, cleanData(data), { years, channels });
            //   }
            // });

            // pillWidget.onAdd(onAdd);

            // pillWidget.onRemove(() => {
            //   const error = document.getElementById('donorSelectError');
            //   const hasPills = !!pillWidget.pillNames.length;
            //   if (hasPills) {
            //     const filteredData = data.filter((d) => pillWidget.pillNames.includes(d.Donor));
            //     updateChartForDonorSeries(filteredData, pillWidget.pillNames);
            //     countryFilter.disabled = false; // enable to select more donors
            //     error.style.display = 'none';
            //   } else {
            //     countryFilter.value = 'All donors'; // reset country filter selected value
            //     renderDefaultChart(chart, cleanData(data), { years, channels });
            //   }
            // });

            dichart.hideLoading();
          });
        });
      },
    },
  });
};

export default renderDonorsChart;
