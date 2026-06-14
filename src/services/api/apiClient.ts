import i18n from "@/lib/i18n";
import { store } from "@/store";
import { logout } from "@/store/modules/auth/slice";
import axios from "axios";
import { toast } from "sonner";

const url =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:5001";

export const apiClient = axios.create({
  baseURL: `${url}/`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isSessionExpired = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 && !isSessionExpired) {
      isSessionExpired = true;
      toast.error(message || i18n.t("auth.sessionExpired"));
      store.dispatch(logout());

      setTimeout(() => {
        isSessionExpired = false;
      }, 3000);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
