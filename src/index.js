import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";

import { createStore } from 'redux';
import allReducers from '../src/reducers'
import { Provider } from 'react-redux';

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>

        <App />

      </Router>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

serviceWorker.unregister();
