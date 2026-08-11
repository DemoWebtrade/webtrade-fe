import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectOpenOrder } from "@/store/modules/order/selector";
import { setOpenOrder } from "@/store/modules/order/slice";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Funnel, Scan, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Asset from "./Asset";
import CategoryList from "./CategoryList";
import OrderCondition from "./OrderCondition";
import OrderHistory from "./OrderHistory";
import OrderNormal from "./OrderNormal";

const MENU_ORDER = [
  {
    key: "BASE",
    label: "order.normal",
  },
  // {
  //   key: "COND",
  //   label: "order.conditional",
  // },
];

const MENU_HISTORY = [
  {
    key: "ORDER",
    label: "Sổ lệnh",
  },
  {
    key: "CATEGORY",
    label: "Danh mục",
  },
  {
    key: "ASSET",
    label: "Tài sản",
  },
];

export default function Order() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectOpenOrder);

  const [tabActive, setTabActive] = useState<string>("BASE");
  const [tabHisTabActive, setHisTabActive] = useState<string>("ORDER");
  const [isHiddenHisTab, setIsHiddenHisTab] = useState<boolean>(false);

  const onClose = () => {
    dispatch(setOpenOrder(false));
    setTabActive("BASE");
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
                {MENU_ORDER.map((item) => (
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

            <div className="flex-1 min-h-0 flex flex-col gap-2">
              <div
                className={`flex flex-wrap border-b border-t border-border select-none w-full ${isHiddenHisTab ? "absolute bottom-0" : ""}`}
              >
                {MENU_HISTORY.map((item) => (
                  <span
                    key={item.key}
                    className={`px-2 whitespace-nowrap text-center text-base pt-1 pb-1.5 md:pb-3 cursor-pointer ${tabHisTabActive === item.key ? "border-b-2 border-purple-active font-medium text-content-primary" : "text-content-tertiary"}`}
                    onClick={() => setHisTabActive(item.key)}
                  >
                    {t(item.label)}
                  </span>
                ))}

                <div className="flex flex-row gap-2 items-center ml-auto mr-2">
                  <div
                    className="cursor-pointer"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("Mở rộng")}
                  >
                    <Scan className="size-3.5" />
                  </div>

                  <div
                    className="cursor-pointer"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={t("Bộ lọc")}
                  >
                    <Funnel className="size-3.5" />
                  </div>

                  <div
                    className={`cursor-pointer ${isHiddenHisTab ? "rotate-180" : ""}`}
                    onClick={() => setIsHiddenHisTab((pre) => !pre)}
                  >
                    <ChevronDown className="size-3.5" />
                  </div>
                </div>
              </div>

              {!isHiddenHisTab && (
                <div className="flex-1 min-h-0">
                  {tabHisTabActive === "ORDER" && <OrderHistory />}
                  {tabHisTabActive === "CATEGORY" && <CategoryList />}
                  {tabHisTabActive === "ASSET" && <Asset />}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
