import { useClickOutside } from "@/hooks/useClickOutside";
import i18n from "@/lib/i18n";
import type { LanguageKey } from "@/types";
import { getTooltipContent, isNonTradingDay } from "@/utils";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Day() {
  const { t } = useTranslation();

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

  useClickOutside(containerRef, () => setOpenCalendar(false));

  const currentLang = (i18n.resolvedLanguage ||
    i18n.language ||
    "vi") as LanguageKey;

  return (
    <div
      className="relative cursor-pointer leading-3"
      ref={containerRef}
      onClick={() => setOpenCalendar(true)}
    >
      <span
        className="text-min leading-3 whitespace-nowrap"
        data-tooltip-id="global-tooltip"
        data-tooltip-content={t("trading-calender")}
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
            <DateCalendar
              defaultValue={dayjs()}
              readOnly
              slots={{
                calendarHeader: ({ currentMonth, onMonthChange }) => {
                  const monthText =
                    currentLang === "vi"
                      ? `Tháng ${currentMonth.month() + 1}, ${currentMonth.year()}`
                      : currentMonth.format("MMMM YYYY");

                  return (
                    <div className="flex justify-between items-center p-4">
                      <span>{monthText}</span>{" "}
                      <div className="flex flex-row items-center gap-2 md:gap-6">
                        <button
                          className="cursor-pointer hover:text-purple-500"
                          onClick={() =>
                            onMonthChange(currentMonth.subtract(1, "month"))
                          }
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("pre-month")}
                        >
                          <ChevronLeft />
                        </button>
                        <button
                          className="cursor-pointer hover:text-purple-500"
                          onClick={() =>
                            onMonthChange(currentMonth.add(1, "month"))
                          }
                          data-tooltip-id="global-tooltip"
                          data-tooltip-content={t("next-month")}
                        >
                          <ChevronRight />
                        </button>
                      </div>
                    </div>
                  );
                },

                day: (props) => {
                  const { day, ...other } = props;
                  const isNonTrading = isNonTradingDay(day);
                  const tooltipContent = isNonTrading
                    ? getTooltipContent(day)
                    : "";

                  return (
                    <PickersDay
                      {...other}
                      day={day}
                      sx={{
                        ...(isNonTrading && {
                          color: "red !important",
                          fontWeight: "bold",
                        }),
                      }}
                      data-tooltip-id={
                        isNonTrading ? "global-tooltip" : undefined
                      }
                      data-tooltip-content={tooltipContent}
                    />
                  );
                },
              }}
              dayOfWeekFormatter={(day) => {
                if (currentLang === "vi") {
                  return ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][day.day()];
                }
                return day.format("dd");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
