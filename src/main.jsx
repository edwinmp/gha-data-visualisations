// import React, { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import './styles/scss/styles.scss';
import './styles/styles.css';
// import App from './App.jsx';
import renderDonorsChart from './charts/donors';
import renderRecipientChart from './charts/recipients.jsx';

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

renderDonorsChart();
let activeChart = 'gha-donors';
const navItems = document.querySelectorAll('.nav-item .nav-link');
navItems.forEach((navItem) => {
  navItem.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveNav(event.target);
    switch (event.target.dataset.chart) {
      case 'gha-donors':
        if (activeChart !== 'gha-donors') {
          resetChartCanvas();
          renderDonorsChart();
          activeChart = 'gha-donors';
        }
        break;
      case 'gha-recipients':
        renderRecipientChart();
        if (activeChart !== 'gha-recipients') {
          resetChartCanvas();
          renderRecipientChart();
          activeChart = 'gha-recipients';
        }
        break;
      default:
        break;
    }
  });
});
