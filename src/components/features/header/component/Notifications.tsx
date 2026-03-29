import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, BellRing, Settings } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useClickOutside(containerRef, () => setOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        className="p-1 hover:bg-bg-button rounded-md"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("announce")}
        onClick={() => setOpen(true)}
      >
        <Bell className="size-5" />
      </button>
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
                className="hover:text-purple-hover p-1 rounded-md"
                data-tooltip-id="global-tooltip"
                data-tooltip-content={t("setting-noti")}
                data-tooltip-place="left"
              >
                <Settings className="size-5" />
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
