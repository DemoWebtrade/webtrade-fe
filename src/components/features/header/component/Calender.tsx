import i18n from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

export default function Day() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const localeMap: Record<string, string> = {
    vi: "vi-VN",
    en: "en-US",
  };

  const locale = localeMap[i18n.language] || "vi-VN";

  const day = useMemo(
    () =>
      new Date().toLocaleDateString(locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [locale],
  );

  return (
    <div
      className="relative cursor-pointer leading-3"
      ref={containerRef}
      onClick={() => setOpenCalendar((pre) => !pre)}
    >
      <span
        className="text-[10px] leading-3"
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Bấm để xem lịch giao dịch"
        data-tooltip-place="right"
      >
        {day}
      </span>

      <AnimatePresence>
        {openCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute md:w-100 md:h-100 w-60 h-60 bg-bg-tertiary border border-border rounded-lg p-2 top-[calc(100%+8px)] left-0 z-10"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
