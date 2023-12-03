import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-app-polyfill/stable';
import 'core-js';
import { createRoot } from 'react-dom';

import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
