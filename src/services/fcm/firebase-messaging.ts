import { getMessaging, getToken, onMessage } from "firebase/messaging";
import apiClient from "../api/apiClient";
import app from "./firebase";

const messaging = getMessaging(app);

// Lấy token (dùng VAPID key)
export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("User từ chối thông báo");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (token) {
      await handleSubscribe(token);
      return token;
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
    await apiClient.post("api/fcm/subscribe", {
      fcm_token: token,
    });
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

export const unsubscribe = async () => {
  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  });
  if (token) {
    await apiClient.post("api/fcm/unsubscribe", { fcm_token: token });
  }
};
