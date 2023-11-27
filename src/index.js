import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CryptoContex from './CryptoContex';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CryptoContex>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CryptoContex>
);

