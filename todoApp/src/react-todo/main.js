import React from 'react';
import Perf from 'react-addons-perf';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.less'; 
window.Perf = Perf;
render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));
