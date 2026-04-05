import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Day from "./Calender";
import Time from "./Time";

export default function DayTrading() {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  useClickOutside(containerRef, () => setOpenCalendar(false));

  return (
    <div
      className="flex md:flex-row flex-col items-center justify-center md:gap-2 md:px-2 px-1 bg-purple-base/30 rounded-md h-10 md:h-8 cursor-pointer"
      data-tooltip-id="global-tooltip"
      data-tooltip-content={t("trading-calender")}
      data-tooltip-place="right"
      ref={containerRef}
      onClick={() => setOpenCalendar(true)}
    >
      {/* Time */}
      <Time />

      {/* Calender */}
      <Day openCalendar={openCalendar} />
    </div>
  );
}
