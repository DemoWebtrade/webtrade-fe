import {
  getMessaging,
  getToken,
  type Messaging,
  onMessage,
} from "firebase/messaging";
import apiClient from "../api/apiClient";
import app from "./firebase";

// Không khởi tạo ngay khi import — iOS sẽ crash
let messaging: Messaging | null = null;

function getMessagingInstance(): Messaging | null {
  // Check trình duyệt có support không
  if (typeof window === "undefined") return null;
  if (!("Notification" in window)) return null;
  if (!("serviceWorker" in navigator)) return null;

  // Lazy init — chỉ tạo khi cần
  if (!messaging) {
    try {
      messaging = getMessaging(app);
    } catch (err) {
      console.warn("FCM không khởi tạo được:", err);
      return null;
    }
  }
  return messaging;
}

export const isSupported = (): boolean => {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
};

export const requestPermission = async (): Promise<string | null> => {
  // Check support trước — không crash iOS
  if (!isSupported()) {
    console.warn("Thiết bị không hỗ trợ Web Push");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const instance = getMessagingInstance();
    if (!instance) return null;

    const token = await getToken(instance, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });

    if (token) {
      await handleSubscribe(token);
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const onMessageListener = () => {
  const instance = getMessagingInstance();
  if (!instance) return Promise.resolve(null);

  return new Promise((resolve) => {
    onMessage(instance, (payload) => resolve(payload));
  });
};

const handleSubscribe = async (token: string) => {
  try {
    await apiClient.post("api/fcm/subscribe", { fcm_token: token });
  } catch (error) {
    console.error("Error subscribing:", error);
  }
};

export const unsubscribe = async () => {
  const instance = getMessagingInstance();
  if (!instance) return;

  try {
    const token = await getToken(instance, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });
    if (token) {
      await apiClient.post("api/fcm/unsubscribe", { fcm_token: token });
    }
  } catch (error) {
    console.error("Error unsubscribing:", error);
  }
};
