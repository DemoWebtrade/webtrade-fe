import { MENU_HISTORY, MENU_ITEMS, MENU_ORDER_SMART } from "@/configs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setTabMenu } from "@/store/modules/common/slice";
import {
  selectOpenFilter,
  selectOpenOrder,
} from "@/store/modules/order/selector";
import { setOpenFilter, setOpenOrder } from "@/store/modules/order/slice";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Funnel, Scan, X } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SprinnerLoader from "../features/skeletons/SprinnerLoader";
import Asset from "./Asset";
import OrderCondition from "./OrderCondition";
import OrderNormal from "./OrderNormal";
import PortfolioListSmart from "./PortfolioListSmart";

const Orders = lazy(() => import("./orders"));

export default function OrderSmart() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOpen = useAppSelector(selectOpenOrder);
  const isOpenFilter = useAppSelector(selectOpenFilter);

  const [tabActive, setTabActive] = useState<string>("BASE");
  const [tabHisTabActive, setHisTabActive] = useState<string>("ORDER");
  const [isHiddenHisTab, setIsHiddenHisTab] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(!isHiddenHisTab);

  const onClose = () => {
    dispatch(setOpenOrder(false));
    setTabActive("BASE");
  };

  const onClickChangeHistory = (id: string) => {
    setHisTabActive(id);
    setIsHiddenHisTab(false);
  };

  const onClickScan = () => {
    const tabId =
      tabHisTabActive === "ORDER"
        ? "ORDER"
        : tabHisTabActive === "PORTFOLIO" || tabHisTabActive === "ASSET"
          ? "ASSET"
          : "BOARD";
    const path = MENU_ITEMS.find((item) => item.key === tabId)?.link ?? "/";

    navigate(path);
    dispatch(setTabMenu(tabId));

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="min-[488px]:w-md w-[90%] h-[calc(100%-4px)] absolute right-0 top-1 z-1 overflow-hidden">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="bg-bg-secondary w-full h-full flex flex-col gap-3"
          >
            <div>
              <div className="flex flex-row">
                {MENU_ORDER_SMART.map((item) => (
                  <span
                    key={item.key}
                    className={`w-1/2 whitespace-nowrap text-center text-base pt-1 pb-1.5 md:pb-3 border-b-2 cursor-pointer ${tabActive === item.key ? "border-purple-active font-medium text-content-primary" : "text-content-tertiary"}`}
                    onClick={() => setTabActive(item.key)}
                  >
                    {t(item.label)}
                  </span>
                ))}
              </div>

              <div
                className="text-content-primary cursor-pointer absolute top-1 right-1"
                onClick={onClose}
              >
                <X className="size-4 md:size-5" />
              </div>

              {tabActive === "BASE" && <OrderNormal />}
              {tabActive === "COND" && <OrderCondition />}
            </div>

            <div className="flex-1 min-h-0 flex flex-col gap-1">
              <motion.div
                layout
                className={`flex flex-wrap border-t border-border py-1 select-none w-full ${
                  isHiddenHisTab ? "absolute bottom-0" : ""
                }`}
                initial={false}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  if (!isHiddenHisTab) {
                    setShowContent(true);
                  }
                }}
              >
                {MENU_HISTORY.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col gap-2 items-center justify-center flex-1 cursor-pointer py-1"
                    onClick={() => onClickChangeHistory(item.key)}
                  >
                    <span
                      className={`px-2 whitespace-nowrap text-center text-sm ${
                        tabHisTabActive === item.key
                          ? "font-medium text-content-primary"
                          : "text-content-tertiary"
                      }`}
                    >
                      {t(item.label)}
                    </span>

                    <AnimatePresence initial={false}>
                      {!isHiddenHisTab &&
                        (tabHisTabActive === item.key ? (
                          <motion.div
                            className="w-full h-0.5 bg-purple-active"
                            layoutId="menu-active-history"
                            transition={{ duration: 0.25 }}
                          />
                        ) : (
                          <div className="w-full h-0.5 bg-border" />
                        ))}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="flex flex-row gap-2 items-center justify-end mr-1 flex-1">
                  <div
                    className="cursor-pointer"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("tooltip.expand")}
                    onClick={onClickScan}
                  >
                    <Scan className="size-3.5" />
                  </div>

                  {(tabHisTabActive === "PORTFOLIO" ||
                    tabHisTabActive === "ORDER") && (
                    <div
                      className="cursor-pointer"
                      data-tooltip-id="global-tooltip"
                      data-tooltip-content={t("tooltip.filter")}
                      onClick={() => dispatch(setOpenFilter(!isOpenFilter))}
                    >
                      <Funnel className="size-3.5" />
                    </div>
                  )}

                  <motion.div
                    className="cursor-pointer"
                    animate={{ rotate: isHiddenHisTab ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    onClick={() => setIsHiddenHisTab((pre) => !pre)}
                  >
                    <ChevronDown className="size-3.5" />
                  </motion.div>
                </div>
              </motion.div>

              <AnimatePresence>
                {showContent && !isHiddenHisTab && (
                  <motion.div
                    className="flex-1 min-h-0"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {tabHisTabActive === "ORDER" && (
                      <Suspense fallback={<SprinnerLoader />}>
                        <Orders />
                      </Suspense>
                    )}
                    {tabHisTabActive === "PORTFOLIO" && (
                      <Suspense fallback={<SprinnerLoader />}>
                        <PortfolioListSmart />
                      </Suspense>
                    )}
                    {tabHisTabActive === "ASSET" && (
                      <Suspense fallback={<SprinnerLoader />}>
                        <Asset />
                      </Suspense>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
