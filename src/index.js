import React from 'react';
import ReactDOM from 'react-dom';
import T from 'i18n-react';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './containers/App';
import ErrorBoundary from './containers/ErrorBoundary';
import registerServiceWorker from './registerServiceWorker';

// TODO: Logic to fetch locale by browser config
T.setTexts(require('./i18n/en.json'));

ReactDOM.render(
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
