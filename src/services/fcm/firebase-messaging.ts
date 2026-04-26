import {
  getMessaging,
  getToken,
  type MessagePayload,
  type Messaging,
  onMessage,
} from "firebase/messaging";
import apiClient from "../api/apiClient";
import app from "./firebase";

let messaging: Messaging | null = null;

function getMessagingInstance(): Messaging | null {
  if (typeof window === "undefined") return null;
  if (!("Notification" in window)) return null;
  if (!("serviceWorker" in navigator)) return null;

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
  try {
    return (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window
    );
  } catch {
    return false;
  }
};

interface IOSNavigator extends Navigator {
  standalone: boolean;
}

export const isIOS = (): boolean =>
  /iphone|ipad|ipod/i.test(navigator.userAgent);

export const isIOSPWA = (): boolean =>
  isIOS() && (navigator as IOSNavigator).standalone === true;

export const requestPermission = async (): Promise<string | null> => {
  if (!isSupported()) {
    if (isIOS() && !isIOSPWA()) {
      console.warn(
        "iOS cần Add to Home Screen để nhận thông báo. " +
          "Mở Safari > Chia sẻ > Thêm vào màn hình chính",
      );
    }
    return null;
  }

  try {
    const permission = await window.Notification.requestPermission();
    if (permission !== "granted") return null;

    const instance = getMessagingInstance();
    if (!instance) return null;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { scope: "/" },
    );
    await navigator.serviceWorker.ready;

    const token = await getToken(instance, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      await handleSubscribe(token);
      return token;
    }
    return null;
  } catch (error) {
    console.warn("FCM skip:", error);
    return null;
  }
};

export const onMessageListener = (
  callback: (payload: MessagePayload) => void,
): (() => void) => {
  const instance = getMessagingInstance();
  if (!instance) return () => {};

  return onMessage(instance, callback);
};

const handleSubscribe = async (token: string): Promise<void> => {
  try {
    await apiClient.post("api/fcm/subscribe", { fcm_token: token });
  } catch (error) {
    console.error("Error subscribing:", error);
  }
};

export const unsubscribe = async (): Promise<void> => {
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
