import SprinnerLoader from "@/components/features/skeletons/SprinnerLoader";
import { MENU_STATEMENT } from "@/configs";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import CashStatement from "./CashStatement";
import HistoryTranferMoney from "./HistoryTranferMoney";
import OrderStatement from "./OrderStatement";
import StockStatement from "./StockStatement";

export default function Statement() {
  const { t } = useTranslation();

  const [tabHisTabActive, setHisTabActive] = useState<string>("MONEY");

  return (
    <div className="w-full h-full flex flex-col md:gap-2 gap-1 p-1 md:p-2">
      <div className="flex flex-wrap border-border py-1 select-none w-full">
        {MENU_STATEMENT.map((item) => (
          <div
            key={item.key}
            className="flex flex-col md:gap-3 gap-1.5 items-center justify-center cursor-pointer py-0.5"
            onClick={() => setHisTabActive(item.key)}
          >
            <span
              className={`md:px-4 px-1 whitespace-nowrap text-center text-base ${
                tabHisTabActive === item.key
                  ? "font-medium text-content-primary"
                  : "text-content-tertiary"
              }`}
            >
              {t(item.label)}
            </span>

            <AnimatePresence initial={false}>
              {tabHisTabActive === item.key ? (
                <motion.div
                  className="w-full h-0.5 bg-purple-active"
                  layoutId="menu-active-statement"
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <div className="w-full h-0.5 bg-border" />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          className="flex-1 min-h-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {tabHisTabActive === "MONEY" && (
            <Suspense fallback={<SprinnerLoader />}>
              <CashStatement />
            </Suspense>
          )}
          {tabHisTabActive === "MONEY_HIS" && (
            <Suspense fallback={<SprinnerLoader />}>
              <HistoryTranferMoney />
            </Suspense>
          )}
          {tabHisTabActive === "ORDER" && (
            <Suspense fallback={<SprinnerLoader />}>
              <OrderStatement />
            </Suspense>
          )}
          {tabHisTabActive === "STOCK" && (
            <Suspense fallback={<SprinnerLoader />}>
              <StockStatement />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
