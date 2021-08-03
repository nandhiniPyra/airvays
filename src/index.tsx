import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Provider as MobxProvider } from 'mobx-react';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import stores from './mobx/stores';

Sentry.init({
  dsn:
    'https://66ce387b908242bc9e2b113bfffd80e1@o441383.ingest.sentry.io/5417338',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});

ReactDOM.render(
  <React.StrictMode>
    <MobxProvider stores={stores}>
      <App />
    </MobxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
