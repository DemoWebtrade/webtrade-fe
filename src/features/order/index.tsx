import SprinnerLoader from "@/components/features/skeletons/SprinnerLoader";
import OrderNormal from "@/components/order-smart/OrderNormal";
import Portfolio from "@/components/portfolio/Portfolio";
import { MENU_ORDER } from "@/configs";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import OrderHistory from "./OrderHistory";
import OrderMatch from "./OrderMatch";
import PriceStep from "./PriceStep";
import TradingViewChart from "./TradingViewChart";

export default function Order() {
  const { t } = useTranslation();

  const [tabHisTabActive, setHisTabActive] = useState<string>("ORDER");

  return (
    <div className="w-full h-full flex flex-col md:flex-row md:gap-2 gap-1 p-1 lg:p-2 md:p-4">
      <div className="contents md:flex md:flex-col md:w-3/4 md:h-full md:gap-2 md:min-h-0">
        <div className="contents lg:flex lg:flex-row lg:gap-2 lg:h-2/3 lg:min-h-0">
          <div className="order-1 min-h-[30vh] lg:h-full bg-bg-secondary rounded-md flex-1 min-w-0 flex flex-col">
            <TradingViewChart />
          </div>

          <div className="order-3 w-full lg:w-56 h-[18vh] lg:h-full flex flex-row lg:flex-col md:gap-2 gap-1 shrink-0">
            <div className="flex-1 bg-bg-secondary rounded-md overflow-y-auto flex flex-col border border-border">
              <h1 className="md:text-base text-sm font-medium px-2 py-1">
                {t("order.price-depth")}
              </h1>
              <PriceStep />
            </div>
            <div className="flex-1 bg-bg-secondary rounded-md text-xs overflow-y-auto border border-border flex flex-col">
              <h1 className="md:text-base text-sm font-medium px-2 py-1">
                {t("order.time-and-sales")}
              </h1>
              <div className="flex-1 min-h-0">
                <OrderMatch />
              </div>
            </div>
          </div>
        </div>

        {/* Sổ lệnh */}
        <div className="order-4 h-[25vh] md:h-1/3 w-full bg-bg-secondary rounded-md overflow-auto border border-border flex flex-col">
          <div className="flex flex-wrap border-border py-1 select-none w-full">
            {MENU_ORDER.map((item) => (
              <div
                key={item.key}
                className="flex flex-col md:gap-2 gap-1 items-center justify-center cursor-pointer py-0.5"
                onClick={() => setHisTabActive(item.key)}
              >
                <span
                  className={`md:px-2 px-1 whitespace-nowrap text-center text-sm ${
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
                      layoutId="menu-active-history"
                      transition={{ duration: 0.25 }}
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
              {tabHisTabActive === "ORDER" && (
                <Suspense fallback={<SprinnerLoader />}>
                  <OrderHistory />
                </Suspense>
              )}
              {tabHisTabActive === "PORTFOLIO" && (
                <Suspense fallback={<SprinnerLoader />}>
                  <Portfolio />
                </Suspense>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Form đặt lệnh */}
      <div className="order-2 bg-bg-secondary w-full md:w-1/4 md:min-w-80 h-auto md:h-full rounded-md shrink-0 border border-border">
        <h1 className="md:text-base text-sm font-medium px-2 py-1">
          {t("order.title")}
        </h1>
        <OrderNormal />
      </div>
    </div>
  );
}
