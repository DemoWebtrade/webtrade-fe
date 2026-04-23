import { getMessaging, getToken, onMessage } from "firebase/messaging";
import apiClient from "../api/apiClient";
import app from "./firebase";

const messaging = getMessaging(app);

// Lấy token (dùng VAPID key)
export const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (token) {
      console.log("FCM Token:", token);

      handleSubscribe(token);
      return token;
    } else {
      console.log("No registration token available");
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

// Nhận notification khi đang mở tab
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

const handleSubscribe = async (token: string) => {
  try {
    const respon = await apiClient.post("api/fcm/subscribe", {
      fcm_token: token,
    });
    console.log("FCM Token:", respon);
  } catch (error) {
    console.error("Error getting token:", error);
  }
};
