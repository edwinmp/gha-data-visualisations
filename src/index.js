import 'core-js';
import renderDonorsChart from './charts/donors';
import renderFundingChannelsChart from './charts/funding-channels';
import renderRecipientChart from './charts/recipients';
import renderPeopleAffectedByCrisisLeaflet from './charts/people-affected-by-crisis-map';
import renderClimateFundingChart from './charts/climate-funding';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderDonorsChart();
  renderFundingChannelsChart();
  renderRecipientChart();
  renderPeopleAffectedByCrisisLeaflet();
  renderClimateFundingChart();
});
