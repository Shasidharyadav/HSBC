// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';  // Global styling

const root = ReactDOM.createRoot(document.getElementById('root'));  // React 18's createRoot method
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
