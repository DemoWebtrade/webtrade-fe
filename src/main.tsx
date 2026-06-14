import "@/assets/css/index.css";
import "@/lib/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store";

window.onerror = (msg, src, line, col, err) => {
  document.body.innerHTML = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      height:100vh;
      background:#f5f5f5;
      font-family:Arial, sans-serif;
    ">
      <div style="
        max-width:500px;
        background:#fff;
        padding:24px;
        border-radius:12px;
        box-shadow:0 4px 20px rgba(0,0,0,0.1);
        text-align:center;
      ">

        <h2 style="color:#e53935;margin:10px 0">
          Oops! Đã xảy ra lỗi
        </h2>

        <p style="color:#555;font-size:14px">
          Trang web đang gặp sự cố ngoài ý muốn.
          Bạn có thể thử tải lại trang hoặc quay lại sau.
        </p>

        <button onclick="location.reload()" style="
          margin-top:16px;
          padding:10px 16px;
          background:#1976d2;
          color:#fff;
          border:none;
          border-radius:6px;
          cursor:pointer;
        ">
          Tải lại trang
        </button>

        <details style="margin-top:20px;text-align:left">
          <summary style="cursor:pointer;color:#999;font-size:13px">
            Thông tin kỹ thuật (dành cho dev)
          </summary>
          <div style="
            margin-top:10px;
            font-size:12px;
            color:#c62828;
            background:#fafafa;
            padding:10px;
            border-radius:6px;
          ">
            <b>Lỗi:</b> ${msg}<br/>
            <b>File:</b> ${src}<br/>
            <b>Dòng:</b> ${line}:${col}<br/>
            <pre style="white-space:pre-wrap">${err?.stack ?? "Không có stack trace"}</pre>
          </div>
        </details>
      </div>
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
