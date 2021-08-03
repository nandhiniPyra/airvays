const requestPermission = (messaging: firebase.messaging.Messaging) => {
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken().then((token) => {
        console.log(token);
      });
    })
    .catch((err) => console.log('User denied Permission', err));
};

export default { requestPermission };
