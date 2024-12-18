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

const resetChartCanvas = () => {
  const activeChartClass = 'dicharts-handler--active';
  const dataSelectorClass = 'data-selector--wrapper';

  const activeChart = document.querySelector(`.${activeChartClass}`);
  if (activeChart) {
    activeChart.classList.remove(activeChartClass);
  }

  const dataSelector = document.querySelector(`.${dataSelectorClass}`);
  if (dataSelector) {
    dataSelector.remove();
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

let activeChart = 'gha-donors';
import('./charts/donors').then(({ default: renderDonorsChart }) => {
  renderDonorsChart();
  activeChart = 'gha-donors';
});
const navItems = document.querySelectorAll('.nav-item .nav-link');
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveNav(event.target);
    switch (event.target.dataset.chart) {
      case 'gha-donors':
        if (activeChart !== 'gha-donors') {
          resetChartCanvas();

          import('./charts/donors').then(({ default: renderDonorsChart }) => {
            renderDonorsChart();
            activeChart = 'gha-donors';
          });
        }
        break;
      case 'gha-recipients':
        if (activeChart !== 'gha-recipients') {
          resetChartCanvas();

          import('./charts/recipients.jsx').then(({ default: renderRecipientChart }) => {
            renderRecipientChart();
            activeChart = 'gha-recipients';
          });
        }
        break;
      case 'gha-funding-channels':
        if (activeChart !== 'gha-funding-channels') {
          resetChartCanvas();

          import('./charts/funding-channels.jsx').then(({ default: renderFundingChannelsChart }) => {
            renderFundingChannelsChart();
            activeChart = 'gha-funding-channels';
          });
        }
      default:
        break;
    }
  });
});
