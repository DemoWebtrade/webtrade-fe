import { useClickOutside } from "@/hooks/useClickOutside"; // chỉnh lại path cho đúng
import { AnimatePresence, motion } from "framer-motion";
import {
  ChartCandlestick,
  FileClock,
  SquareChevronRight,
  SquarePen,
  Wallet,
} from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import DayTrading from "../header/component/DayTrading";

const MENU_ITEMS = [
  { key: "BOARD", label: "menu.board", icon: ChartCandlestick },
  { key: "ORDER", label: "menu.order", icon: SquarePen },
  { key: "ASSET", label: "menu.asset", icon: Wallet },
  { key: "STATEMENT", label: "menu.statement", icon: FileClock },
];

export default function Menu() {
  const { t } = useTranslation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [tabActive, setTabActive] = useState<string>("BOARD");
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpenMenu(false));

  return (
    <div
      ref={menuRef}
      className="absolute top-0 left-0 z-10 h-full"
      onMouseEnter={() => setIsOpenMenu(true)}
    >
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative z-10 h-full md:w-56 w-46 bg-bg-tertiary shadow-[10px_0_30px_-10px_rgba(0,0,0,1)] flex flex-col pb-3"
          >
            <div className="py-3">
              <DayTrading />
            </div>

            <div className="px-4 pb-2 text-xs font-medium text-content-tertiary uppercase tracking-wide">
              {t("menu.title")}
            </div>

            <nav className="flex flex-col gap-0.5 px-2">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = tabActive === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => setTabActive(item.key)}
                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-purple-active/10 text-purple-active font-medium"
                        : "text-content-secondary hover:bg-bg-primary hover:text-content-primary"
                    }`}
                  >
                    <Icon
                      className={`size-4 shrink-0 transition-colors duration-150 ${
                        isActive
                          ? "text-purple-active"
                          : "text-content-tertiary group-hover:text-content-primary"
                      }`}
                    />
                    <span>{t(item.label)}</span>

                    {isActive && (
                      <motion.span
                        layoutId="menu-active-dot"
                        className="ml-auto size-1.5 rounded-full bg-purple-active"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`cursor-pointer bg-bg-primary border border-border rounded-full p-1.5 absolute top-[calc(100%-150px)] translate-y-1/2 z-20 transition-[left] duration-300 ease-in-out ${
          isOpenMenu ? "left-52 rotate-180" : "left-0"
        }`}
        data-tooltip-id="global-tooltip"
        data-tooltip-place="right"
        data-tooltip-content={t("Menu")}
        onClick={() => setIsOpenMenu((prev) => !prev)}
        data-tour="prop-1"
      >
        <SquareChevronRight className="size-3.5 text-content-tertiary" />
      </div>
    </div>
  );
}
