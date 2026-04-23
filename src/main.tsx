import "@/assets/css/index.css";
import "@/lib/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store";

// Bắt lỗi toàn app — hiện lên màn hình thay vì trắng
window.onerror = (msg, src, line, col, err) => {
  document.body.innerHTML = `
    <div style="padding:20px;font-family:monospace;font-size:12px;color:red">
      <b>Lỗi:</b><br/>
      ${msg}<br/><br/>
      <b>File:</b> ${src}<br/>
      <b>Dòng:</b> ${line}:${col}<br/><br/>
      <b>Stack:</b><br/>
      <pre>${err?.stack ?? "không có"}</pre>
    </div>
  `;
};

window.onunhandledrejection = (e) => {
  document.body.innerHTML = `
    <div style="padding:20px;font-family:monospace;font-size:12px;color:red">
      <b>Unhandled Promise Rejection:</b><br/>
      <pre>${e.reason?.stack ?? e.reason ?? "không có thông tin"}</pre>
    </div>
  `;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
