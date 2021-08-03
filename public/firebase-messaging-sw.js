/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

try {
  firebase.initializeApp({
    messagingSenderId: '359822709289'
  });

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const windowClient = windowClients[i];
          windowClient.postMessage(payload);
        }
      })
      .then(() => {
        return registration.showNotification('react-boilerplate');
      });
    return promiseChain;
  });

  self.addEventListener('notificationclick', function (event) {
    alert('User clicked the notification');
  });
} catch (err) {
  console.log('Error on Firebase Messagin', err);
}
