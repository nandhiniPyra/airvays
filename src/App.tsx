import React, { useEffect } from 'react';
import firebaseApp from './firebase';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes';
import notifications from './utils/Notifications';
import SnackbarContextProvider from './context/SnackbarContextProvider';
import injectWithObserver from './utils/injectWithObserver';
import { socket } from './utils/Socket';
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core';
import theme from './theme';
// Initializing firebase App and services
firebaseApp.InitializeApp();
firebaseApp.InitializeAnalytics();
firebaseApp.InitializePerformance(); // Performance monitoring
const messaging = firebaseApp.InitializeMessaging(); // Push Notifications

function App({ stores }: any) {
  const { setLoginUser, setSocket, setUserLogout, removeRedirect } =
    stores.userStore;
  useEffect(() => {
    messaging && notifications.requestPermission(messaging);
  });
  useEffect(() => {
    socket(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDk1MWY5MjE4YjYwMTA0YmFiZDVlYyIsImlhdCI6MTYxODgyMzc2OH0.I-vxNsXMpa3RZKmcXhuI6D_F1ye4n5gniGeaxbD_0l4',
    )
      .then((socket) => setSocket(socket))
      .catch(console.log);
  }, []);
  return (
    <MuiThemeProvider theme={theme}>
      <ErrorBoundary>
        <SnackbarContextProvider>
          <Routes />
        </SnackbarContextProvider>
      </ErrorBoundary>
    </MuiThemeProvider>
  );
}

export default injectWithObserver(App);
