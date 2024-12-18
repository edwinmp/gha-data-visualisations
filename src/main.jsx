import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/scss/styles.scss';
import './styles/styles.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
