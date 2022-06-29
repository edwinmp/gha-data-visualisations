import deepMerge from 'deepmerge';
import defaultOptions, { colorways, legendSelection } from '../echarts';
import fetchCSVData from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';
import PillWidget from '../../widgets/pills';

const cleanValue = (value) =>
  value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()) : null;

const cleanData = (data) =>
  data.map((d) => {
    const clean = { ...d };
    clean.value = cleanValue(d.Proportions);

    return clean;
  });

const processData = (data, years, donor, channel) => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['Delivery Channel'] === channel);
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
            (d) => d['Delivery Channel'] === channel && d.Donor === 'All donors' && `${d.Year}` === params.name
          );

          return `All donors, ${params.name} <br />${channel}: <strong>${Number(params.value, 10).toFixed(
            2
          )}%</strong> (US$${toDollars(
            cleanValue(item['US$ millions, constant 2019 prices']),
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

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          // const csv = '/public/assets/data/GHA/2021/funding-channels-interactive-data.csv';
          const csv =
            'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/charts/public/assets/data/GHA/2021/funding-channels-interactive-data.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = Array.from(new Set(data.map((d) => d.Donor)));
            const years = Array.from(new Set(data.map((d) => d.Year)));
            const channels = Array.from(new Set(data.map((d) => d['Delivery Channel'])));
            const channelSelectErrorMessage = 'You can compare two donors. Please remove one before adding another.';
            // create UI elements
            const countryFilter = addFilter(
              {
                wrapper: filterWrapper,
                options: donors.sort(),
                className: 'country-filter',
                label: '<b>Select up to 2 donors</b>',
              },
              false,
              'channelSelectError',
              channelSelectErrorMessage
            );
            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            // initialise pill widget for the multi-select option
            const pillWidget = new PillWidget({ wrapper: filterWrapper });
            if (pillWidget.pills.length) {
              chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            }

            const updateChartForDonorSeries = (updatedData, activeDonors) => {
              const cleanedData = cleanData(updatedData);
              const series = activeDonors
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
                          (d) => d['Delivery Channel'] === channel && d.Donor === donor && `${d.Year}` === params.name
                        );
                        const value = item
                          ? `<strong>${(item.value * 100).toFixed(2)}%</strong> (US$${toDollars(
                              cleanValue(item['US$ millions, constant 2019 prices']),
                              'decimal',
                              'never'
                            )} million)`
                          : `<strong>${(item.value * 100).toFixed(2)}%</strong>`;

                        return `${donor}, ${params.name} <br />${channel}: ${value}`;
                      },
                    },
                    label: {
                      // only show single label that overlaps the stack
                      show: index === 0 && activeDonors.length > 1,
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

            const onAdd = (value) => {
              // filter data to return only the selected items
              const filteredData =
                value !== 'All donors' ? data.filter((d) => pillWidget.pillNames.includes(d.Donor)) : data;
              const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
              updateChartForDonorSeries(filteredData, selectedDonors);
            };

            /**
             * Event Listeners/Handlers
             * */
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              const error = document.getElementById('channelSelectError');
              if (value !== 'All donors') {
                // if it's the first pill, append pill widget
                if (!pillWidget.pillNames.length) {
                  chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
                }
                if (pillWidget.pillNames.length >= 2) {
                  error.style.display = 'block';
                } else {
                  pillWidget.add(value);
                  error.style.display = 'none';
                }
              } else {
                pillWidget.removeAll();
              }
            });

            pillWidget.onAdd(onAdd);

            pillWidget.onRemove(() => {
              const hasPills = !!pillWidget.pillNames.length;
              const error = document.getElementById('channelSelectError');
              if (hasPills) {
                const filteredData = data.filter((d) => pillWidget.pillNames.includes(d.Donor));
                updateChartForDonorSeries(filteredData, pillWidget.pillNames);
                error.style.display = 'none';
              } else {
                countryFilter.value = 'All donors'; // reset country filter selected value
                renderDefaultChart(chart, cleanData(data), { years, channels });
              }
            });

            dichart.hideLoading();
          });
        });
      },
    },
  });
};

export default renderFundingChannelsChart;
