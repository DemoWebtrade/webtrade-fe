importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyC7uw6u-X0JKZGNOxOUtqWtDrrzTu2EyQQ",
  authDomain: "lhc-webtrade.firebaseapp.com",
  projectId: "lhc-webtrade",
  storageBucket: "lhc-webtrade.firebasestorage.app",
  messagingSenderId: "278865501187",
  appId: "1:278865501187:web:ee02853dbc0a6bad138236",
});

const messaging = firebase.messaging();

// Nhận thông báo khi app đang background hoặc đóng
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    icon: "/lhc_logo_32.png",
    badge: "/lhc_logo_32.png",
    image: "/lhc_logo_32.png",
  });
});
