importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.title,
  };

  return self.ServiceWorkerRegistration.showNotification(
    notificationTitle,
    notificationOptions
  );
});