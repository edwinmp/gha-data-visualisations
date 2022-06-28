import 'core-js';
import renderDonorsChart from './charts/gha/donors';
import renderFundingChannelsChart from './charts/gha/funding-channels';
import renderRecipientChart from './charts/gha/recipients';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderDonorsChart();
  renderFundingChannelsChart();
  renderRecipientChart();
});
