import React, { useEffect } from 'react';
import firebaseApp from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes';
import notifications from './utils/Notifications';
import SnackbarContextProvider from './context/SnackbarContextProvider';
import injectWithObserver from './utils/injectWithObserver';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import './app.css';
import NetworkDetector from './Hoc/NetworkDetector';

// Initializing firebase App and services
firebaseApp.InitializeApp();
firebaseApp.InitializeAnalytics();
firebaseApp.InitializePerformance(); // Performance monitoring
const messaging = firebaseApp.InitializeMessaging(); // Push Notifications

function App({ stores }: any) {
  useEffect(() => {
    messaging && notifications.requestPermission(messaging);
  });

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles />
      <ErrorBoundary>
        <SnackbarContextProvider>
          <Routes />
        </SnackbarContextProvider>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}

export default NetworkDetector(injectWithObserver(App));
