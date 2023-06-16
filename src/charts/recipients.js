import deepMerge from 'deepmerge';
import React from 'react';
import { createRoot } from 'react-dom/client';
import RecipientChartFilters from '../components/RecipientChartFilters';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import defaultOptions, { getYAxisNamePositionFromSeries, handleResize, legendSelection } from './echarts';

const DATA_URL = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/public/assets/data/recipient-and-donors.csv`;
const donorColors = ['#f49b21', '#fccc8e', '#f9b865', '#e48a00', '#a85d00', '#7d4712'];
const orgtypeColors = ['#f49b21', '#feedd4', '#fccc8e', '#f9b865', '#e48a00', '#a85d00', '#7d4712'];

const nf = new Intl.NumberFormat();

const cleanValue = (value) =>
  value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()).toFixed(2) : null;

const cleanData = (data, field = 'Value') =>
  data.map((d) => {
    const clean = { ...d };
    clean.value = cleanValue(d[field]);

    return clean;
  });

const processData = (data, years, recipient, donor) => {
  const filteredData = data.filter((d) => d.Recipient.trim() === recipient && d.Series === donor);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year) || null);

  return sortedData;
};

const processOrgTypeData = (data, orgType, years) => {
  const filteredData = data.filter((d) => d.Series === orgType);
  const sortedData = years.map((year) => {
    const yearData = filteredData.find((d) => d.Year === year);

    return {
      value: yearData ? cleanValue(yearData.Value) || null : null,
      emphasis: {
        focus: 'self',
      },
    };
  });

  return sortedData;
};

const getRecipientDonors = (data, recipient) => {
  const preApprovedDonors = ['US', 'Germany', 'EU institutions', 'Japan', 'UK', 'All other donors'];
  const recipientData = data.filter((d) => d.Recipient.trim() === recipient);
  if (preApprovedDonors.length >= 5) {
    return preApprovedDonors;
  }
  const donors = Array.from(new Set(recipientData.map((d) => d.Series)))
    .filter((d) => !preApprovedDonors.includes(d))
    .slice(0, 5);

  return donors.concat(preApprovedDonors);
};

const getRecipientOrgType = (data, recipient) => {
  const recipientData = data.filter((d) => d.Recipient.trim() === recipient);
  const orgTypes = Array.from(new Set(recipientData.map((d) => d.Series)));

  return orgTypes;
};

const getYaxisValue = (namePosition = 'far') => {
  const paddingMapping = {
    near: [-35, 0, 0, 0],
    middle: [-45, 0, 0, 0],
    far: [-54, 0, 0, 0],
  };

  return {
    type: 'value',
    nameRotate: 90,
    name: 'US$ millions',
    nameLocation: 'end',
    nameTextStyle: {
      verticalAlign: 'top',
      align: 'right',
      padding: paddingMapping[namePosition],
    },
  };
};

const renderDefaultChart = (chart, data, recipient, { years, channels }) => {
  const option = {
    color: donorColors,
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
      position: 'bottom',
    },
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, recipient, channel).map((d) => ({
        value: d && Number(d.value).toFixed(2),
        emphasis: {
          focus: 'self',
        },
      })),
      type: 'bar',
      stack: 'channels',
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${channel}, ${params.name} <br />10 largest recipients: <strong>US$${nf.format(
            Math.round(params.value)
          )} million</strong>`,
      },
      animation: false,
    })),
  };
  option.yAxis = getYaxisValue(getYAxisNamePositionFromSeries(option.series));
  defaultOptions.toolbox.feature.saveAsImage.name = 'recipients';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });
  chart.on('legendselectchanged', (params) => {
    legendSelection(chart, params);
  });

  return chart;
};

const updateChartByDonors = (chart, updatedData, { recipient, years }) => {
  const cleanedData = cleanData(updatedData);
  const donors = getRecipientDonors(updatedData, recipient);
  const series = donors
    .map((donor) => ({
      name: donor,
      data: processData(cleanedData, years, recipient, donor === 'All other donors' ? 'Other donors' : donor).map(
        (d) => ({
          value: d && Number(d.value).toFixed(2),
          emphasis: {
            focus: 'self',
          },
        })
      ),
      type: 'bar',
      stack: recipient,
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${donor}, ${params.name} <br/>${recipient}: <strong>US$${nf.format(
            Math.round(params.value)
          )} million</strong>`,
      },
    }))
    .reduce((final, cur) => final.concat(cur), []);
  chart.setOption(
    { yAxis: getYaxisValue(getYAxisNamePositionFromSeries(series)), series },
    { replaceMerge: ['series'] }
  );
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

const updateChartByOrgType = (chart, updatedData, { recipient, years }) => {
  const orgTypes = sortOrgTypes(getRecipientOrgType(updatedData, recipient));
  const series = orgTypes
    .map((orgType) => ({
      name: orgType,
      data: processOrgTypeData(updatedData, orgType, years),
      type: 'bar',
      stack: recipient,
      cursor: 'auto',
      tooltip: {
        trigger: 'item',
        formatter: (params) =>
          `${params.name} <br/>${orgType}: <strong>US$${nf.format(Math.round(params.value))} million</strong>`,
      },
    }))
    .reduce((final, cur) => final.concat(cur), []);
  const color = orgtypeColors;
  chart.setOption(
    { yAxis: getYaxisValue(getYAxisNamePositionFromSeries(series)), color, series },
    { replaceMerge: ['series'] }
  );
};

/**
 * Run your code after the page has loaded
 */
const renderRecipientChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-recipients',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, async (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          const joinedData = await fetchCSVData(DATA_URL);
          const donorData = joinedData.filter((d) => d.Type === 'Donor');
          const orgTypeData = joinedData.filter((d) => d.Type === 'Channel');
          const filterWrapper = addFilterWrapper(chartNode);
          // extract unique values
          const recipients = Array.from(new Set(donorData.map((d) => d.Recipient)));
          const years = Array.from(new Set(donorData.map((d) => d.Year)));
          const defaultRecipient = 'Afghanistan'; // used to be '10 largest recipients'
          const defaultBreakdown = 'By donor';
          const initialDonors = getRecipientDonors(donorData, defaultRecipient);
          // create UI elements
          // in case the recipients are different, we create another dropdown with the org type data
          const orgTypeRecipients = Array.from(new Set(orgTypeData.map((d) => d.Recipient)));
          // defaults to donor breakdown
          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, cleanData(donorData), defaultRecipient, {
            years,
            channels: initialDonors,
          });

          let selectedRecipient = defaultRecipient;

          // add dropdown event handlers
          const onSelectRecipient = (value, breakdown = defaultBreakdown) => {
            selectedRecipient = value || defaultRecipient;
            if (breakdown === 'By donor') {
              if (selectedRecipient !== '10 largest recipients') {
                const filteredData = donorData.filter((d) => d.Recipient === selectedRecipient);
                updateChartByDonors(chart, filteredData, { recipient: selectedRecipient, years }, breakdown);
              } else {
                selectedRecipient = '10 largest recipients'; // reset country filter selected value
                renderDefaultChart(chart, cleanData(donorData), '10 largest recipients', {
                  years,
                  channels: initialDonors,
                });
              }
            } else {
              updateChartByOrgType(
                chart,
                orgTypeData.filter((d) => d.Recipient === value),
                { recipient: value, years }
              );
            }
          };

          const onSelectBreakdown = (value, recipient) => {
            if (value === 'By donor') {
              if (recipient !== '10 largest recipients') {
                const filteredData = donorData.filter((d) => d.Recipient === recipient);
                updateChartByDonors(chart, filteredData, { recipient, years }, value);
              } else {
                renderDefaultChart(
                  chart,
                  cleanData(donorData),
                  '10 largest recipients',
                  {
                    years,
                    channels: initialDonors,
                  },
                  value
                );
              }
            } else {
              updateChartByOrgType(
                chart,
                orgTypeData.filter((d) => d.Recipient === recipient),
                { recipient, years }
              );
            }
          };

          // create dropdowns
          const root = createRoot(filterWrapper);
          root.render(
            <RecipientChartFilters
              donorRecipients={recipients}
              orgTypeRecipients={orgTypeRecipients}
              onSelectRecipient={onSelectRecipient}
              onSelectBreakdown={onSelectBreakdown}
              defaultBreakdown={defaultBreakdown}
              defaultRecipient={defaultRecipient}
            />
          );

          dichart.hideLoading();

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderRecipientChart;
