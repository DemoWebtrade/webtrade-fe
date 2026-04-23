import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC7uw6u-X0JKZGNOxOUtqWtDrrzTu2EyQQ",
  authDomain: "lhc-webtrade.firebaseapp.com",
  projectId: "lhc-webtrade",
  storageBucket: "lhc-webtrade.firebasestorage.app",
  messagingSenderId: "278865501187",
  appId: "1:278865501187:web:ee02853dbc0a6bad138236",
  measurementId: "G-1GP2943WVJ",
};

const app = initializeApp(firebaseConfig);

export default app;
