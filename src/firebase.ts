import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/messaging';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyASPXkyZ1bb8MmEPiLV4Y2DmujAVgH8dxY',
//   authDomain: 'pyramidions-expo-starter.firebaseapp.com',
//   databaseURL: 'https://pyramidions-expo-starter.firebaseio.com',
//   projectId: 'pyramidions-expo-starter',
//   storageBucket: 'pyramidions-expo-starter.appspot.com',
//   messagingSenderId: '359822709289',
//   appId: '1:359822709289:web:40758f1dc7d052624c4238',
//   measurementId: 'G-PHBBZEFQS6'
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASPXkyZ1bb8MmEPiLV4Y2DmujAVgH8dxY",
  authDomain: "pyramidions-expo-starter.firebaseapp.com",
  databaseURL: "https://pyramidions-expo-starter.firebaseio.com",
  projectId: "pyramidions-expo-starter",
  storageBucket: "pyramidions-expo-starter.appspot.com",
  messagingSenderId: "359822709289",
  appId: "1:359822709289:web:edfebc4a9e75ee9d4c4238",
  measurementId: "G-0PFK3GL9MV"
};
declare type FirebaseAppProps = {
  InitializeApp: () => firebase.app.App;
  InitializeAnalytics: () => firebase.analytics.Analytics;
  InitializePerformance: () => firebase.performance.Performance;
  InitializeMessaging: () => firebase.messaging.Messaging | null;
};

const firebaseApp: FirebaseAppProps = {
  InitializeApp: () => firebase.initializeApp(firebaseConfig),
  InitializeAnalytics: () => firebase.analytics(),
  InitializePerformance: () => firebase.performance(),
  InitializeMessaging: () => {
    if (firebase.messaging.isSupported()) {
      const defaultMessaging = firebase.messaging();
      defaultMessaging.usePublicVapidKey(
        'BEwJsg2FhIL9AIYV6BE5I4X4jkNoWjzLUF-pNWQdmL_SMVDYuRQ2Kzvb7AD3sXDQ6UptDifYMSWYkRKZD3hk-7I'
      );
      return defaultMessaging;
    } else return null;
  }
};

export default firebaseApp;
