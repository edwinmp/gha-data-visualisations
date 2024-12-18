// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import './styles/scss/styles.scss';
import './styles/styles.css';
// import App from './App.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

// set default variables
let chart = null;
let map = null;
let filterRoot = null;

const resetChartCanvas = () => {
  const activeChartClass = 'dicharts-handler--active';
  const dataSelectorClass = 'data-selector--wrapper';

  if (chart) {
    chart.clear();
    chart.dispose();
    chart = null;
  }

  const activeChart = document.querySelector(`.${activeChartClass}`);
  if (activeChart) {
    activeChart.classList.remove(activeChartClass);
  }

  if (filterRoot) {
    filterRoot.unmount();
    filterRoot = null;
  }

  const dataSelector = document.querySelector(`.${dataSelectorClass}`);
  if (dataSelector) {
    dataSelector.remove();
  }
};

const resetMapCanvas = () => {
  if (map) {
    map.remove();
    map = null;
  }
  if (filterRoot) {
    filterRoot.unmount();
    filterRoot = null;
  }
};

const showElement = (className) => {
  const element = document.querySelector(`.${className}`);
  if (element.classList.contains('d-none')) {
    element.classList.remove('d-none');
  }
};

const hideElement = (className) => {
  const element = document.querySelector(`.${className}`);
  if (!element.classList.contains('d-none')) {
    element.classList.add('d-none');
  }
};

const setActiveNav = (nav) => {
  const currentActiveNav = document.querySelector('.nav-link.active');
  if (currentActiveNav) {
    currentActiveNav.classList.remove('active');
  }
  if (nav) {
    nav.classList.add('active');
  }
};

// Initial default chart
showElement('dicharts--chart');
hideElement('dicharts--map');
let activeChart = 'gha-donors';
import('./charts/donors').then(({ default: renderDonorsChart }) => {
  renderDonorsChart().then((configs) => {
    chart = configs.chart;
    filterRoot = configs.filterRoot;
  });
  activeChart = 'gha-donors';
});

// Event listener for navigation items
const navItems = document.querySelectorAll('.nav-item .nav-link');
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveNav(event.target);
    switch (event.target.dataset.chart) {
      case 'gha-donors':
        if (activeChart !== 'gha-donors') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/donors').then(({ default: renderDonorsChart }) => {
            renderDonorsChart().then((configs) => {
              chart = configs.chart;
              filterRoot = configs.filterRoot;
            });
            activeChart = 'gha-donors';
          });
        }
        break;
      case 'gha-recipients':
        if (activeChart !== 'gha-recipients') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/recipients.jsx').then(({ default: renderRecipientChart }) => {
            renderRecipientChart().then((configs) => {
              chart = configs.chart;
              filterRoot = configs.filterRoot;
            });
            activeChart = 'gha-recipients';
          });
        }
        break;
      case 'gha-funding-channels':
        if (activeChart !== 'gha-funding-channels') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/funding-channels.jsx').then(({ default: renderFundingChannelsChart }) => {
            renderFundingChannelsChart().then((configs) => {
              chart = configs.chart;
              filterRoot = configs.filterRoot;
            });
            activeChart = 'gha-funding-channels';
          });
        }
        break;
      case 'gha-people-affected-by-crisis':
        if (activeChart !== 'gha-people-affected-by-crisis') {
          resetChartCanvas(true);
          hideElement('dicharts--chart');
          showElement('dicharts--map');
          resetMapCanvas();

          import('./charts/people-affected-by-crisis-map.jsx').then(
            ({ default: renderPeopleAffectedByCrisisLeaflet }) => {
              renderPeopleAffectedByCrisisLeaflet().then((configs) => {
                map = configs.map;
                filterRoot = configs.filterRoot;
              });
              activeChart = 'gha-people-affected-by-crisis';
            },
          );
        }
        break;
      case 'gha-climate-funding':
        if (activeChart !== 'gha-climate-funding') {
          resetChartCanvas(true);
          hideElement('dicharts--chart');
          showElement('dicharts--map');
          resetMapCanvas();

          import('./charts/climate-funding.jsx').then(({ default: renderClimateFundingMap }) => {
            renderClimateFundingMap().then((configs) => {
              map = configs.map;
              filterRoot = configs.filterRoot;
            });
            activeChart = 'gha-climate-funding';
          });
        }
        break;
      case 'gha-total-climate-finance':
        if (activeChart !== 'gha-total-climate-finance') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/total-climate-finance.jsx').then(({ default: renderTotalClimateFinanceChart }) => {
            renderTotalClimateFinanceChart().then((configs) => {
              chart = configs.chart;
            });
            activeChart = 'gha-total-climate-finance';
          });
        }
        break;
      case 'gha-climate-percentage-oda':
        if (activeChart !== 'gha-climate-percentage-oda') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/climate-percentage-oda-bubble.jsx').then(({ default: renderClimatePercentageOdaChart }) => {
            renderClimatePercentageOdaChart().then((configs) => {
              chart = configs.chart;
            });
            activeChart = 'gha-climate-percentage-oda';
          });
        }
        break;
      case 'gha-climate-adaptation-funding':
        if (activeChart !== 'gha-climate-adaptation-funding') {
          resetChartCanvas();
          resetMapCanvas();
          showElement('dicharts--chart');
          hideElement('dicharts--map');

          import('./charts/climate-adaptation-funding-bubble.jsx').then(
            ({ default: renderClimateAdaptationFundingChart }) => {
              renderClimateAdaptationFundingChart().then((configs) => {
                chart = configs.chart;
              });
              activeChart = 'gha-climate-adaptation-funding';
            },
          );
        }
        break;
      default:
        break;
    }
  });
});
