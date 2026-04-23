import { Toggle } from "@/components/ui/Toggle";
import { useClickOutside } from "@/hooks/useClickOutside";
import {
  isSupported,
  requestPermission,
  unsubscribe,
} from "@/services/fcm/firebase-messaging";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellRing, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const notiRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [notifOn, setNotifOn] = useState(Notification.permission === "granted");
  const [denied, setDenied] = useState(Notification.permission === "denied");

  useClickOutside(containerRef, () => {
    setOpen(false);
    setOpenSetting(false);
  });
  useClickOutside(notiRef, () => setOpenSetting(false));

  const handleToggleNotif = async () => {
    if (notifOn) {
      // Tắt — xoá token khỏi server
      await unsubscribe();
      setNotifOn(false);
      return;
    }

    if (Notification.permission === "denied") {
      setDenied(true);
      return;
    }

    // Xin quyền + lấy FCM token
    const token = await requestPermission();
    if (token) {
      setNotifOn(true);
      setDenied(false);
    } else {
      setDenied(true);
    }
  };

  const supported = isSupported();

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      <div
        className="p-1 hover:bg-bg-button rounded-md"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("announce")}
        onClick={() => setOpen(true)}
      >
        <Bell className="size-5" />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute md:w-90 md:h-120 w-60 h-80 bg-bg-tertiary border border-border rounded-lg top-[calc(100%+4px)] -right-20 md:right-0 z-10 flex flex-col"
          >
            <div className="flex flex-row items-center justify-between p-2 border-b border-border">
              <h1 className="text-base text-content-primary font-semibold">
                Thông báo
              </h1>
              <div
                className="p-1 rounded-md relative"
                data-tooltip-id="global-tooltip"
                data-tooltip-content={t("setting-noti")}
                data-tooltip-place="left"
                ref={notiRef}
              >
                <Settings
                  className="size-5"
                  onClick={() => setOpenSetting(true)}
                />
                {openSetting && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute md:w-72 w-60 bg-bg-tertiary border border-border rounded-lg top-[calc(100%+4px)] -right-20 md:right-0 z-10 flex flex-col overflow-hidden"
                  >
                    {/* Toggle chính */}
                    {supported ? (
                      <button
                        onClick={handleToggleNotif}
                        className="flex items-center justify-between px-4 py-3 hover:bg-bg-secondary transition-colors text-left w-full"
                      >
                        <div>
                          <p className="text-sm">
                            {t("noti.receive-notifications")}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5">
                            {denied
                              ? t("noti.browser-block")
                              : notifOn
                                ? t("noti.turn-on")
                                : t("noti.turn-off")}
                          </p>
                        </div>
                        <Toggle on={notifOn} />
                      </button>
                    ) : (
                      <div className="px-4 py-3 border-t border-border">
                        <p className="text-xs text-text-secondary">
                          Thông báo chưa được hỗ trợ trên trình duyệt này
                        </p>
                      </div>
                    )}

                    {/* Sub options — chỉ hiện khi bật */}
                    {/* {notifOn && (
                      <div className="border-t border-border">
                        {(
                          [
                            { key: "news", label: "Tin tức & khuyến mãi" },
                            { key: "account", label: "Cập nhật tài khoản" },
                            { key: "trade", label: "Giao dịch & lệnh" },
                          ] as const
                        ).map(({ key, label }) => (
                          <label
                            key={key}
                            className="flex items-center justify-between px-4 py-2.5 pl-7 hover:bg-bg-secondary transition-colors cursor-pointer"
                          >
                            <span className="text-xs text-text-secondary">
                              {label}
                            </span>
                            <input
                              type="checkbox"
                              checked={prefs[key]}
                              onChange={(e) =>
                                setPrefs((p) => ({
                                  ...p,
                                  [key]: e.target.checked,
                                }))
                              }
                              className="w-3.5 h-3.5 accent-green-500 cursor-pointer"
                            />
                          </label>
                        ))}
                      </div>
                    )} */}

                    {/* Cảnh báo bị block */}
                    {denied && (
                      <div className="px-4 py-2.5 bg-warning/10 border-t border-border">
                        <p className="text-xs text-warning">
                          Trình duyệt đã chặn. Vào cài đặt trình duyệt để bật
                          lại.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
            <div className="flex-1 p-2 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4 md:px-8 px-2">
                <BellRing className="size-20 md:size-30 text-content-disable/50" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-center text-content-disable/50 text-sm md:px-4 px-1">
                    {t("noti.title")}
                  </h2>
                  <span className="text-center text-xs text-content-disable/50">
                    {t("noti.detail")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
