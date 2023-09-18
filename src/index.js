import 'core-js';
import renderDonorsChart from './charts/donors';
import renderFundingChannelsChart from './charts/funding-channels';
import renderRecipientChart from './charts/recipients';
import renderPeopleAffectedByCrisisLeaflet from './charts/people-affected-by-crisis-map';
import './styles/styles.css';
import renderClimateFundingMap from './charts/climate-funding';
import renderTotalClimateFinanceChart from './charts/total-climate-finance';
import renderClimatePercentageOdaChart from './charts/climate-percentage-oda-bubble';
import renderClimateAdaptationFundingChart from './charts/climate-adaptation-funding-bubble';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderDonorsChart();
  renderFundingChannelsChart();
  renderRecipientChart();
  renderPeopleAffectedByCrisisLeaflet();
  renderClimateFundingMap();
  renderTotalClimateFinanceChart();
  renderClimatePercentageOdaChart();
  renderClimateAdaptationFundingChart();
});
