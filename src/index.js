import 'core-js';
import renderDonorsChart from './charts/donors';
import renderFundingChannelsChart from './charts/funding-channels';
import renderRecipientChart from './charts/recipients';
import renderPeopleAffectedByCrisisLeaflet from './charts/leaflet-map';
import './styles/styles.css';

// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderDonorsChart();
  renderFundingChannelsChart();
  renderRecipientChart();
  renderPeopleAffectedByCrisisLeaflet();
});
