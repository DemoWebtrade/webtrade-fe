import i18n from "@/lib/i18n";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

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

  useEffect(() => {
    const handleCickOutsize = (event: MouseEvent) => {
      if (
        containerRef?.current &&
        !containerRef?.current.contains(event?.target as Node)
      ) {
        setOpenCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleCickOutsize);

    return () => {
      document.removeEventListener("mousedown", handleCickOutsize);
    };
  }, []);

  return (
    <div
      className="relative cursor-pointer leading-3"
      ref={containerRef}
      onClick={() => setOpenCalendar(true)}
    >
      <span
        className="text-min leading-3 whitespace-nowrap"
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
            className="absolute md:w-76 md:h-75 w-60 h-68 bg-bg-tertiary border border-border rounded-lg px-2 top-[calc(100%+8px)] md:top-[calc(100%+20px)] -left-1 md:-left-20 z-10"
          >
            <DateCalendar defaultValue={dayjs()} readOnly />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
