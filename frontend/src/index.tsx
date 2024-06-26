import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CountryList from './CountryList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CountryList />
  </React.StrictMode>
);

reportWebVitals();
