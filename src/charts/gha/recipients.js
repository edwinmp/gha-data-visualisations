import deepMerge from 'deepmerge';
import defaultOptions, { colorways } from '../echarts';
import fetchCSVData from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const nf = new Intl.NumberFormat();

const cleanValue = (value) => (value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()).toFixed(2) : null);

const cleanData = (data, field = 'Value') => data.map((d) => {
  const clean = { ...d };
  clean.value = cleanValue(d[field]);

  return clean;
});

const processData = (data, years, recipient, donor) => {
  const filteredData = data.filter((d) => d['Destination country'].trim() === recipient && d['Donor organisation'] === donor);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year) || null);

  return sortedData;
};

const processOrgTypeData = (data, recipient, orgType) => {
  const properties = ['Destination Country', 'Recipient Org Type'];
  const filteredData = data.find(
    (d) => d[properties[0]].trim() === recipient && d[properties[1]] === orgType,
  );
  const sortedData = Object.keys(filteredData)
    .filter((d) => !properties.includes(d))
    .map((year) => ({
      value: cleanValue(filteredData[year]) || null,
      emphasis: {
        focus: 'self',
      },
    }));

  return sortedData;
};

const getRecipientDonors = (data, recipient) => {
  const preApprovedDonors = ['All other donors'];
  const recipientData = data.filter((d) => d['Destination country'].trim() === recipient);
  const donors = [...new Set(recipientData.map((d) => d['Donor organisation']))].filter((d) => !preApprovedDonors.includes(d)).slice(0, 5);

  return donors.concat(preApprovedDonors);
};

const getRecipientOrgType = (data, recipient) => {
  const recipientData = data.filter((d) => d['Destination Country'].trim() === recipient);
  const orgTypes = [...new Set(recipientData.map((d) => d['Recipient Org Type']))];

  return orgTypes;
};

const renderDefaultChart = (chart, data, recipient, { years, channels }) => {
  const option = {
    color: colorways.orange,
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
      position: 'bottom',
    },
    yAxis: {
      type: 'value',
      nameRotate: 90,
      name: 'US$ millions',
      nameLocation: 'middle',
      nameTextStyle: {
        verticalAlign: 'top',
        align: 'right',
        padding: [-60, 0, 0, 0],
      },
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
        formatter: (params) => `${channel}, ${params.name} <br />10 largest recipients: <strong>US$${nf.format(Math.round(params.value))} million</strong>`,
      },
      animation: false,
    })),
  };
  defaultOptions.toolbox.feature.saveAsImage.name = 'recipients';
  chart.setOption(deepMerge(option, defaultOptions), { replaceMerge: ['series'] });

  return chart;
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
          const donorData = await fetchCSVData('https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/charts/public/assets/data/GHA/2021/recipients-by-donor.csv');
          const orgTypeData = await fetchCSVData('https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/charts/public/assets/data/GHA/2021/recipients-by-org-type.csv');
          const filterWrapper = addFilterWrapper(chartNode);
          // extract unique values
          const recipients = [...new Set(donorData.map((d) => d['Destination country']))];
          const years = [...new Set(donorData.map((d) => d.Year))];
          const initialDonors = getRecipientDonors(donorData, '10 largest recipients');
          // create UI elements
          const [countryFilterA, countryFilterAWrapper] = addFilter({
            wrapper: filterWrapper,
            options: recipients.sort(),
            className: 'country-filter',
            label: '<b>Select recipient</b>',
            defaultOption: '10 largest recipients',
          }, true);
          // in case the recipients are different, we create another dropdown with the org type data
          const orgTypeRecipients = [...new Set(orgTypeData.map((d) => d['Destination Country']))];
          const [countryFilterB, countryFilterBWrapper] = addFilter({
            wrapper: filterWrapper,
            options: orgTypeRecipients.sort(),
            className: 'country-filter',
            label: '<b>Select recipient</b>',
          }, true);
          countryFilterBWrapper.classList.add('display-none');

          const contextFilter = addFilter({
            wrapper: filterWrapper,
            options: ['By donor', 'By type of organisation receiving funding'],
            className: 'breakdown-filter',
            label: '<b>Choose breakdown</b>',
          });
          // defaults to donor breakdown
          const chart = window.echarts.init(chartNode);
          renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), '10 largest recipients', { years, channels: initialDonors });

          const updateChartByDonor = (updatedData, recipient) => {
            const cleanedData = cleanData(updatedData, 'USD deflated millions');
            const donors = getRecipientDonors(updatedData, recipient);
            const series = donors
              .map((donor) => ({
                name: donor,
                data: processData(cleanedData, years, recipient, donor).map(
                  (d) => ({
                    value: d && Number(d.value).toFixed(2),
                    emphasis: {
                      focus: 'self',
                    },
                  }),
                ),
                type: 'bar',
                stack: recipient,
                cursor: 'auto',
                tooltip: {
                  trigger: 'item',
                  formatter: (params) => `${donor}, ${params.name} <br/>${recipient}: <strong>US$${nf.format(Math.round(params.value))} million</strong>`,
                },
              }))
              .reduce((final, cur) => final.concat(cur), []);
            chart.setOption({ series }, { replaceMerge: ['series'] });
          };
          const updateChartByOrgType = (updatedData, recipient) => {
            const orgTypes = getRecipientOrgType(updatedData, recipient);
            const series = orgTypes
              .map((orgType) => ({
                name: orgType,
                data: processOrgTypeData(updatedData, recipient, orgType),
                type: 'bar',
                stack: recipient,
                cursor: 'auto',
                tooltip: {
                  trigger: 'item',
                  formatter: (params) => `${params.name} <br/>${orgType}: <strong>US$${nf.format(Math.round(params.value))} million</strong>`,
                },
              }))
              .reduce((final, cur) => final.concat(cur), []);
            chart.setOption({ series }, { replaceMerge: ['series'] });
          };

          /**
            * Event Listeners/Handlers
            * */
          countryFilterA.addEventListener('change', (event) => {
            const { value } = event.currentTarget;
            if (value !== '10 largest recipients') {
              const filteredData = value !== '10 largest recipients' ? donorData.filter((d) => d['Destination country'] === value) : donorData;
              updateChartByDonor(filteredData, value);
            } else {
              countryFilterA.value = '10 largest recipients'; // reset country filter selected value
              renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), '10 largest recipients', { years, channels: initialDonors });
            }
          });
          contextFilter.addEventListener('change', (event) => {
            const { value } = event.currentTarget;
            if (value === 'By donor') {
              countryFilterAWrapper.classList.remove('display-none');
              countryFilterBWrapper.classList.add('display-none');
              countryFilterA.value = countryFilterB.value;
              renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), countryFilterA.value, { years, channels: initialDonors });
            } else {
              countryFilterB.value = countryFilterA.value; // reset country filter selected value
              countryFilterAWrapper.classList.add('display-none');
              countryFilterBWrapper.classList.remove('display-none');
              updateChartByOrgType(
                orgTypeData.filter((d) => d['Destination Country'] === countryFilterB.value),
                countryFilterB.value,
              );
            }
          });
          countryFilterB.addEventListener('change', (event) => {
            const { value } = event.currentTarget;
            if (value !== '10 largest recipients') {
              const filteredData = value !== '10 largest recipients' ? orgTypeData.filter((d) => d['Destination Country'] === value) : orgTypeData;
              updateChartByOrgType(filteredData, value);
            } else {
              countryFilterA.value = '10 largest recipients'; // reset country filter selected value
              renderDefaultChart(chart, cleanData(donorData, 'USD deflated millions'), countryFilterA.value, { years, channels: initialDonors });
            }
          });

          dichart.hideLoading();
        });
      },
    },
  });
};

export default renderRecipientChart;
