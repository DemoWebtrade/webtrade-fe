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
      className="text-xs w-[120xp] relative"
      ref={containerRef}
      onClick={() => setOpenCalendar((pre) => !pre)}
    >
      {day}

      <AnimatePresence>
        {openCalendar && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute w-100 h-100 bg-bg-tertiary border border-border rounded-lg p-2 top-[calc(100%+6px)] right-0 z-10"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
