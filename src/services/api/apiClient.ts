import axios from "axios";

const url =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_MARKET_SOCKET_URL
    : "http://localhost:5000";

export const apiClient = axios.create({
  baseURL: `${url}/`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
