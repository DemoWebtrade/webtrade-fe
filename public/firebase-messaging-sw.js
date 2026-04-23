importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyC7uw6u-X0JKZGNOxOUtqWtDrrzTu2EyQQ",
  authDomain: "lhc-webtrade.firebaseapp.com",
  projectId: "lhc-webtrade",
  storageBucket: "lhc-webtrade.firebasestorage.app",
  messagingSenderId: "278865501187",
  appId: "1:278865501187:web:ee02853dbc0a6bad138236",
  measurementId: "G-1GP2943WVJ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/lhc_logo.png",
  });
});
